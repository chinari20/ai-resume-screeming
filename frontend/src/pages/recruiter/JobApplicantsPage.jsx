import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandidateRankingTable from "../../components/dashboard/CandidateRankingTable";
import Loader from "../../components/common/Loader";
import { recruiterApi } from "../../services/api";

const JobApplicantsPage = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = () => recruiterApi.getApplicants(id).then(({ data }) => setApplications(data));

  useEffect(() => {
    loadData();
  }, [id]);

  const runScreening = async () => {
    const { data } = await recruiterApi.screenJob(id);
    setApplications(data.applications);
    setMessage("Screening completed.");
  };

  const onStatusChange = async (applicationId, status) => {
    await recruiterApi.updateApplicationStatus(applicationId, { status });
    loadData();
  };

  if (!applications) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Job Applicants</h1>
        <button onClick={runScreening} className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950">
          Run AI screening
        </button>
      </div>
      {message && <p className="text-sm text-brand-100">{message}</p>}
      <CandidateRankingTable applications={applications} onStatusChange={onStatusChange} />
    </div>
  );
};

export default JobApplicantsPage;
