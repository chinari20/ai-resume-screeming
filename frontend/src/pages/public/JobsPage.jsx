import { useEffect, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import JobCard from "../../components/jobs/JobCard";
import { jobsApi } from "../../services/api";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ title: "", location: "", skills: "" });

  useEffect(() => {
    setLoading(true);
    jobsApi
      .getAll(filters)
      .then(({ data }) => setJobs(data))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="panel grid gap-4 p-6 md:grid-cols-3">
        {["title", "location", "skills"].map((field) => (
          <input
            key={field}
            placeholder={`Filter by ${field}`}
            value={filters[field]}
            onChange={(event) => setFilters((current) => ({ ...current, [field]: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          />
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : jobs.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      ) : (
        <EmptyState title="No jobs found" description="Adjust the filters or add seed data." />
      )}
    </div>
  );
};

export default JobsPage;
