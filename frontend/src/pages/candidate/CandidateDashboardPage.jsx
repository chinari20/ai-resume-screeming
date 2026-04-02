import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard";
import Loader from "../../components/common/Loader";
import JobCard from "../../components/jobs/JobCard";
import { candidateApi } from "../../services/api";

const CandidateDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    Promise.all([
      candidateApi.getProfile(),
      candidateApi.getApplications(),
      candidateApi.getRecommendedJobs(),
    ]).then(([profileRes, applicationsRes, jobsRes]) => {
      setProfile(profileRes.data);
      setApplications(applicationsRes.data);
      setRecommendedJobs(jobsRes.data);
    });
  }, []);

  if (!profile) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Candidate Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Welcome back, {profile.fullName || "Candidate"}</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Skills" value={profile.skills?.length || 0} accent="bg-brand-500/20 text-brand-100" />
        <StatCard title="Applications" value={applications.length} accent="bg-sky-500/20 text-sky-100" />
        <StatCard title="Recommendations" value={recommendedJobs.length} accent="bg-amber-500/20 text-amber-100" />
      </div>
      <div className="panel p-6">
        <h2 className="text-xl font-semibold text-white">Recommended jobs</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {recommendedJobs.slice(0, 4).map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboardPage;
