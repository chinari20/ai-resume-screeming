# AI Resume Screening & Smart Hiring Platform
<<<<<<< HEAD
=======

>>>>>>> c41b4117e26aed73fad155e243cf759c149382a3
Production-style MERN application with JWT auth, role-based dashboards, resume upload/parsing, automated candidate scoring, recruiter screening workflows, admin analytics, and seed data.

## Folder Structure

```text
miniProject/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── data/seed.js
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── uploads/
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       └── utils/
├── .env.example
└── README.md
```

## Demo Credentials

- Admin: `admin@hireai.com` / `Admin@123`
- Recruiter: `ava@talentforge.com` / `Recruiter@123`
- Candidate: `riya@mail.com` / `Candidate@123`

## Install and Run

### Backend

```powershell
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

### Frontend

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Main Features

- JWT authentication with role-based route protection
- Candidate profile management and resume upload
- PDF/DOC/DOCX parsing via `pdf-parse` and `mammoth`
- Rule-based AI screening with weighted scoring
- Recruiter job CRUD, applicant ranking, status updates, and screening
- Admin analytics dashboard with charts
- Seeded users, jobs, applications, and parsed resumes

## Testing Checklist

1. Start MongoDB locally.
2. Seed backend data with `npm run seed`.
3. Login with admin, recruiter, and candidate demo credentials.
4. As candidate, upload a resume and apply to a job.
5. As recruiter, run screening for a job and update applicant statuses.
6. As admin, verify dashboard analytics, users, jobs, and applications.
