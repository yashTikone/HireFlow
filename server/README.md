# HireFlow API

## Setup

1. Install Node.js 20 or newer and start MongoDB (local MongoDB or Atlas).
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGO_URI` and a unique `JWT_SECRET`.
4. Add `OPENAI_API_KEY` if you want AI-generated resume/job explanations. Without a key, HireFlow still provides transparent skill-mention matching and a rule-based explanation.
5. Start the API with `node --watch index.js`.

The API runs on port 3000 by default. Uploaded resumes and profile photos are stored under `server/uploads`; configure persistent storage before deployment because local disk may be ephemeral on hosting platforms.

## Resume matching

Recruiters can use **Analyze resume** on the applicants page for jobs they own. The service extracts text from a candidate's uploaded PDF, compares the job's listed skills with explicit mentions in the resume, and returns matched skills, skills not found in the text, a score, and an explanation. If `OPENAI_API_KEY` is configured, the explanation is AI-assisted. The score itself is an explicit skill-mention ratio, not a prediction of job performance. Always review the original resume; skills not found in text are unverified, not proof of absence.

## Security note

Do not commit `.env`, real API keys, uploaded resumes, or profile photos. Configure production CORS, secrets, persistent file storage, and HTTPS before deploying.
