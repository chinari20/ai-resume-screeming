import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { recruiterApi } from "../../services/api";

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState(null);

  const loadJobs = () => recruiterApi.getJobs().then(({ data }) => setJobs(data));

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    await recruiterApi.deleteJob(id);
    loadJobs();
  };

  if (!jobs) return <Loader />;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job._id} className="panel flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">{job.title}</h2>
            <p className="text-sm text-slate-300">{job.location} · {job.status}</p>
          </div>
          <div className="flex gap-3">
            <Link to={`/recruiter/jobs/${job._id}/applicants`} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              Applicants
            </Link>
            <button onClick={() => handleDelete(job._id)} className="rounded-full bg-rose-500/20 px-4 py-2 text-sm text-rose-200">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageJobsPage;
