import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { jobsApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    jobsApi.getOne(id).then(({ data }) => setJob(data));
  }, [id]);

  const handleApply = async () => {
    try {
      await jobsApi.apply(id, { coverLetter: "Interested in contributing to this role." });
      setMessage("Application submitted successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  if (!job) return <Loader />;

  return (
    <div className="panel p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-brand-200">{job.companyName}</p>
      <h1 className="mt-2 text-4xl font-bold text-white">{job.title}</h1>
      <p className="mt-4 text-slate-300">{job.location} · {job.jobType} · {job.salaryRange}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {job.requiredSkills?.map((skill) => (
          <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">{skill}</span>
        ))}
      </div>
      <p className="mt-6 whitespace-pre-line text-slate-300">{job.jobDescription}</p>
      {user?.role === "candidate" && (
        <button onClick={handleApply} className="mt-8 rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950">
          Apply now
        </button>
      )}
      {message && <p className="mt-4 text-sm text-brand-100">{message}</p>}
    </div>
  );
};

export default JobDetailsPage;
