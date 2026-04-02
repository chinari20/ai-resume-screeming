import { Link } from "react-router-dom";

const JobCard = ({ job }) => (
  <div className="panel p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-200">{job.companyName}</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{job.title}</h3>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{job.jobType}</span>
    </div>
    <p className="mt-4 text-sm text-slate-300">{job.location} · {job.salaryRange || "Compensation on request"}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {(job.requiredSkills || []).slice(0, 5).map((skill) => (
        <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
          {skill}
        </span>
      ))}
    </div>
    <p className="mt-4 line-clamp-3 text-sm text-slate-400">{job.jobDescription}</p>
    <Link
      to={`/jobs/${job._id}`}
      className="mt-5 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950"
    >
      View details
    </Link>
  </div>
);

export default JobCard;
