import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import JobCard from "../../components/jobs/JobCard";
import { candidateApi } from "../../services/api";

const RecommendedJobsPage = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    candidateApi.getRecommendedJobs().then(({ data }) => setJobs(data));
  }, []);

  if (!jobs) return <Loader />;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {jobs.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
};

export default RecommendedJobsPage;
