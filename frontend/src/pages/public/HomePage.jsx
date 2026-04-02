import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="space-y-12">
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">AI Resume Screening & Smart Hiring</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white">
          Recruit faster with ranking, scoring, and skill-gap intelligence built in.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          HireAI helps recruiters post jobs, candidates apply with resumes, and the platform automatically parses, scores, ranks, and explains every application.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/jobs" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950">
            Explore jobs
          </Link>
          <Link to="/register" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white">
            Start hiring
          </Link>
        </div>
      </div>
      <div className="panel p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Automated parsing", "PDF and DOCX resume ingestion with extracted skills and experience"],
            ["Weighted scoring", "Skills, experience, education and JD similarity combined into one score"],
            ["Recruiter actions", "Shortlist, reject, interview schedule and notes in one workflow"],
            ["Admin analytics", "Platform-wide user, job, application and skill demand insights"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl bg-white/5 p-4">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
