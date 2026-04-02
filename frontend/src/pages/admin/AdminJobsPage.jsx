import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { adminApi } from "../../services/api";

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    adminApi.getJobs().then(({ data }) => setJobs(data));
  }, []);

  if (!jobs) return <Loader />;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job._id} className="panel p-5">
          <h2 className="text-lg font-semibold text-white">{job.title}</h2>
          <p className="mt-1 text-sm text-slate-300">{job.companyName} · {job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminJobsPage;
