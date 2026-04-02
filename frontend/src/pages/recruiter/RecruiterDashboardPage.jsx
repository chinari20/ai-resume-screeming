import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard";
import Loader from "../../components/common/Loader";
import { recruiterApi } from "../../services/api";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    recruiterApi.getJobs().then(({ data }) => setJobs(data));
  }, []);

  if (!jobs) return <Loader />;

  const openJobs = jobs.filter((job) => job.status === "open").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Recruiter Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Manage hiring pipelines</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Posted Jobs" value={jobs.length} accent="bg-brand-500/20 text-brand-100" />
        <StatCard title="Open Jobs" value={openJobs} accent="bg-emerald-500/20 text-emerald-100" />
        <StatCard title="Closed Jobs" value={jobs.length - openJobs} accent="bg-slate-500/20 text-slate-100" />
      </div>
      <div className="panel p-6">
        <h2 className="text-xl font-semibold text-white">Recent job posts</h2>
        <div className="mt-4 space-y-3">
          {jobs.slice(0, 5).map((job) => (
            <div key={job._id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <div>
                <p className="font-medium text-white">{job.title}</p>
                <p className="text-sm text-slate-400">{job.location}</p>
              </div>
              <p className="text-sm text-slate-300">{job.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
