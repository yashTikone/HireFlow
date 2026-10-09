import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import {
  analyzeApplication,
  getJobApplications,
  updateApplicationStatus,
} from '../services/applicationService';
import Toast from '../components/Toast';

const statuses = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

export default function Applicants() {
  const { id } = useParams();
  const [apps, setApps] = useState([]);
  const [analyses, setAnalyses] = useState({});
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState(null);

  const load = () => getJobApplications(id)
    .then((response) => setApps(response.data.applications))
    .catch((error) => setToast({
      message: error.response?.data?.message || 'Unable to load applicants',
      type: 'error',
    }));

  useEffect(() => {
    load();
  }, [id]);

  const update = async (application, status) => {
    try {
      await updateApplicationStatus(application._id, status);
      await load();
      setToast({ message: 'Application status updated' });
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Unable to update status', type: 'error' });
    }
  };

  const analyze = async (application) => {
    setBusyId(application._id);
    try {
      const response = await analyzeApplication(application._id);
      setAnalyses((current) => ({ ...current, [application._id]: response.data }));
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Unable to analyze this resume',
        type: 'error',
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <DashboardLayout>
      <Toast {...toast} onClose={() => setToast(null)} />
      <div className="page-head">
        <div>
          <span className="eyebrow">HIRING PIPELINE</span>
          <h1>Applicants.</h1>
          <p>Review candidates, explore resume insights, and move applicants through the hiring process.</p>
        </div>
      </div>

      <div className="applicant-list">
        {apps.map((application) => {
          const analysis = analyses[application._id];
          const candidate = application.candidate;

          return (
            <article className="applicant-card" key={application._id}>
              <div className="applicant-avatar">{candidate?.name?.[0] || '?'}</div>
              <div className="applicant-main">
                <div>
                  <h3>{candidate?.name || 'Candidate'}</h3>
                  <p>{candidate?.email} · {candidate?.phone || 'No phone provided'}</p>
                </div>
                <div className="skill-row">
                  {(candidate?.skills || []).slice(0, 5).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <div className="applicant-actions">
                  <button
                    className="secondary-btn"
                    type="button"
                    disabled={busyId === application._id}
                    onClick={() => analyze(application)}
                  >
                    {busyId === application._id ? 'Analyzing resume…' : '✦ Analyze resume'}
                  </button>
                  <select
                    aria-label={`Application status for ${candidate?.name || 'candidate'}`}
                    value={application.status}
                    onChange={(event) => update(application, event.target.value)}
                  >
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
                {analysis && (
                  <section className="match-analysis" aria-live="polite">
                    <div className="match-analysis-heading">
                      <div>
                        <span className="eyebrow">RESUME MATCH</span>
                        <h3>{analysis.score}% compatibility</h3>
                      </div>
                      <span className="analysis-mode">{analysis.analysisMode === 'ai-assisted' ? 'AI-assisted insight' : 'Skills-based insight'}</span>
                    </div>
                    <p>{analysis.explanation}</p>
                    <div className="analysis-skills">
                      <div>
                        <strong>Skills found</strong>
                        <div className="skill-row">
                          {analysis.matchedSkills.length
                            ? analysis.matchedSkills.map((skill) => <span key={skill}>{skill}</span>)
                            : <small>No listed skills were detected.</small>}
                        </div>
                      </div>
                      <div>
                        <strong>Not found in resume text</strong>
                        <div className="skill-row">
                          {analysis.missingSkills.length
                            ? analysis.missingSkills.map((skill) => <span key={skill}>{skill}</span>)
                            : <small>All listed skills were detected.</small>}
                        </div>
                      </div>
                    </div>
                    <small className="analysis-disclaimer">{analysis.disclaimer}</small>
                  </section>
                )}
              </div>
            </article>
          );
        })}
        {apps.length === 0 && (
          <div className="empty-card">
            <h3>No applicants yet.</h3>
            <p>Applications for this role will appear here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
