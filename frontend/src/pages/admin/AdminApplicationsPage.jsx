import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ScoreBadge from "../../components/common/ScoreBadge";
import { adminApi } from "../../services/api";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    adminApi.getApplications().then(({ data }) => setApplications(data));
  }, []);

  if (!applications) return <Loader />;

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application._id} className="panel flex items-center justify-between gap-4 p-5">
          <div>
            <p className="font-medium text-white">{application.candidate?.name}</p>
            <p className="text-sm text-slate-300">{application.job?.title} · {application.job?.companyName}</p>
          </div>
          <ScoreBadge score={application.score} />
        </div>
      ))}
    </div>
  );
};

export default AdminApplicationsPage;
