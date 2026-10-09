# HireFlow 🚀
### Making Candidates' & Recruiters' Lives Easier.

HireFlow is a full-stack talent acquisition platform designed to simplify the recruitment workflow for candidates and recruiters.

The project explores how a modern recruitment platform can bring job discovery, applications, candidate management, and resume-based job matching together in one place.

## ✨ Features

### 👨‍💻 Candidate
- Browse available job opportunities.
- View job descriptions and required skills.
- Create and manage a professional profile.
- Upload and manage resumes.
- Apply for jobs.
- Track application progress.

### 🧑‍💼 Recruiter
- Create and manage job openings.
- View applicants for posted jobs.
- Manage application statuses.
- Review candidate information.
- Analyze resume-to-job skill compatibility.

### 📄 Resume Matching
- Extract text from uploaded PDF resumes.
- Identify skills mentioned in resumes.
- Compare candidate skills with job requirements.
- Calculate a skill-match percentage.
- Identify required skills not found in the extracted resume text.
- Provide a structured overview to support recruiter review.

The matching score is based on explicit skill matching. It is a decision-support feature, not a measure of a candidate's actual ability or suitability for employment.

### 🔐 Authentication & Security
- User registration and login.
- Password hashing with bcrypt.
- JWT-based authentication.
- Role-based authorization for candidates and recruiters.
- Ownership checks for protected recruitment operations.

### 🎨 User Interface
- Responsive React interface.
- Light and dark themes.
- Reusable UI components.
- Candidate and recruiter dashboards.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- REST APIs
- JWT
- bcrypt

### Database
- MongoDB
- Mongoose

### AI Integration
- OpenAI-compatible API integration for generated explanations.
- Rule-based skill matching as a fallback when the external AI service is unavailable.

## 🏗️ Project Structure

```text
HireFlow/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
├── server/
│   ├── Applications/
│   ├── Authentication/
│   ├── Jobs/
│   ├── Profiles/
│   ├── config/
│   ├── models/
│   ├── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- MongoDB Community Server or a MongoDB Atlas database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/yashTikone/HireFlow.git
cd HireFlow
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/hireflow
JWT_SECRET=replace_with_a_secure_random_secret
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Replace the JWT secret with a securely generated random value.

Add your own OpenAI API key if you want to use the external AI explanation service. API access may require separate billing.

Never commit your actual `.env` file or API keys to GitHub.

### 3. Start the backend

From the `server` directory:

```bash
node --watch index.js
```

The API should be available at:

```text
http://localhost:3000
```

### 4. Configure the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Keep both terminals running while using the application.

## 🔄 Application Workflow

```text
Candidate Registration
         |
         v
Create Profile & Upload Resume
         |
         v
Browse Jobs & Apply
         |
         v
Recruiter Reviews Applicants
         |
         v
Resume–Job Skill Matching
         |
         v
Structured Matching Results
```

## 🔒 Security Notes

- Environment variables must remain private.
- Passwords are hashed before storage.
- Protected endpoints use authentication and authorization.
- Recruiters should only access applications associated with their own jobs.
- Uploaded resumes contain personal information and should not be committed to the repository.
- Production deployments should use secure environment variables and appropriate file storage.

## 🎯 Project Objective

The goal of HireFlow was to understand how a modern recruitment workflow is engineered and explore how resume-based matching can be integrated into that workflow.

Building this project provided hands-on experience with frontend development, backend APIs, database integration, authentication, file uploads, and matching logic.

## 🚧 Future Improvements

- Cloud deployment and production configuration.
- Persistent cloud storage for uploaded resumes.
- Improved resume parsing and skill normalization.
- Expanded automated testing.
- More comprehensive candidate-job matching.

## 👨‍💻 Author

**Yash  Tikone**

GitHub: [@yashTikone](https://github.com/yashTikone)

---

**HireFlow — Making Candidates' & Recruiters' Lives Easier.**
