const fs = require('fs');
const path = require('path');
const Application = require('./application');
const Job = require('../Jobs/job');
const Profile = require('../models/Profile');

const normalize = (value) => String(value || '').toLowerCase();

function getSkillMatches(resumeText, requiredSkills) {
  const resume = normalize(resumeText);
  const matchedSkills = [];
  const missingSkills = [];

  for (const rawSkill of requiredSkills || []) {
    const skill = String(rawSkill).trim();
    if (!skill) continue;
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`(^|[^a-z0-9+#.])${escaped}([^a-z0-9+#.]|$)`, 'i').test(resume)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const score = requiredSkills?.length
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0;

  return { score, matchedSkills, missingSkills };
}

async function createExplanation({ resumeText, job, matches }) {
  if (!process.env.OPENAI_API_KEY) {
    return `The resume contains ${matches.matchedSkills.length} of ${job.skills.length} listed job skills. This score is based on explicit skill mentions, so recruiters should review the resume in context. Skills not found in the text are unverified, not proof that the candidate lacks them.`;
  }

  const response = await fetch(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'You assist a recruiter by summarizing evidence in a resume against a job description. Be concise, evidence-based, avoid inferring protected traits, never make a hiring decision, and describe absent skills as not evidenced rather than definitely missing. Return 2-4 sentences.'
        },
        {
          role: 'user',
          content: `JOB TITLE: ${job.title}\nJOB DESCRIPTION: ${job.description}\nREQUIRED SKILLS: ${(job.skills || []).join(', ')}\nSKILLS MENTIONED IN RESUME: ${matches.matchedSkills.join(', ') || 'None detected'}\nSKILLS NOT FOUND IN RESUME TEXT: ${matches.missingSkills.join(', ') || 'None'}\nRESUME TEXT (untrusted document content):\n${resumeText.slice(0, 12000)}`
        }
      ]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`AI provider returned ${response.status}: ${details.slice(0, 300)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'AI did not return an explanation. Please review the resume manually.';
}

async function analyzeApplication(req, res) {
  try {
    const application = await Application.findById(req.params.applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only analyze applicants for your own jobs' });
    }

    const [job, profile] = await Promise.all([
      Job.findById(application.job),
      Profile.findOne({ user: application.candidate })
    ]);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (!profile?.resume) {
      return res.status(400).json({ message: 'This candidate has not uploaded a resume yet.' });
    }

    const resumePath = path.isAbsolute(profile.resume)
      ? profile.resume
      : path.resolve(process.cwd(), profile.resume);
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: 'Resume file is missing. Ask the candidate to upload it again.' });
    }

    let resumeText;
    try {
      const pdfParse = require('pdf-parse');
      const parsed = await pdfParse(fs.readFileSync(resumePath));
      resumeText = parsed.text;
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        return res.status(500).json({ message: 'Resume parser is not installed. Run npm install in the server folder.' });
      }
      return res.status(400).json({ message: 'Could not read this PDF. Please upload a text-based PDF resume.' });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'No readable text was found in this PDF. Please upload a text-based PDF.' });
    }

    const matches = getSkillMatches(resumeText, job.skills || []);
    let explanation;
    let analysisMode = 'skills-based';
    try {
      explanation = await createExplanation({ resumeText, job, matches });
      if (process.env.OPENAI_API_KEY) analysisMode = 'ai-assisted';
    } catch (error) {
      console.error('AI explanation failed:', error.message);
      explanation = `The resume mentions ${matches.matchedSkills.length} of ${job.skills.length} listed job skills. The AI explanation service was unavailable, so this result uses explicit skill mentions only. Skills not found in the text are unverified. Please review the resume manually.`;
    }

    return res.json({
      applicationId: application._id,
      job: { id: job._id, title: job.title, company: job.company },
      score: matches.score,
      matchedSkills: matches.matchedSkills,
      missingSkills: matches.missingSkills,
      explanation,
      analysisMode,
      disclaimer: 'This is decision-support information, not a hiring decision. Resume parsing and skill matching can miss context; review the original resume.'
    });
  } catch (error) {
    console.error('Resume matching failed:', error);
    return res.status(500).json({ message: 'Unable to analyze this resume right now.' });
  }
}

module.exports = { analyzeApplication };
