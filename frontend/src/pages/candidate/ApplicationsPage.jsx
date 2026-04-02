import { useEffect, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import ScoreBadge from "../../components/common/ScoreBadge";
import { candidateApi } from "../../services/api";
import { getStatusColor } from "../../utils/formatters";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    candidateApi.getApplications().then(({ data }) => setApplications(data));
  }, []);

  if (!applications) return <Loader />;
  if (!applications.length) return <EmptyState title="No applications yet" description="Apply to a job from the listings page." />;

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application._id} className="panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{application.job?.title}</h2>
              <p className="text-sm text-slate-300">{application.job?.companyName}</p>
            </div>
            <ScoreBadge score={application.score} />
          </div>
          <p className="mt-4 text-sm text-slate-300">{application.summary}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs ${getStatusColor(application.status)}`}>{application.status}</span>
            <span className="text-xs text-slate-400">{application.recommendation}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsPage;
