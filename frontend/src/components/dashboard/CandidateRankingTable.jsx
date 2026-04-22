import ScoreBadge from "../common/ScoreBadge";
import { formatDate, getStatusColor } from "../../utils/formatters";

const CandidateRankingTable = ({ applications, onStatusChange }) => (
  <div className="panel overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/5 text-slate-300">
          <tr>
            <th className="px-4 py-3">Candidate</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Matched Skills</th>
            <th className="px-4 py-3">Recommendation</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id} className="border-t border-white/5">
              <td className="px-4 py-4 text-white">
                <div>{application.candidate?.name}</div>
                <div className="text-xs text-slate-400">{formatDate(application.createdAt)}</div>
              </td>
              <td className="px-4 py-4"><ScoreBadge score={application.score} /></td>
              <td className="px-4 py-4 text-slate-300">{application.matchedSkills?.join(", ") || "N/A"}</td>
              <td className="px-4 py-4 text-slate-300">{application.recommendation}</td>
              <td className="px-4 py-4">
                <span className={`rounded-full px-3 py-1 text-xs ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <select
                  defaultValue={application.status}
                  onChange={(event) => onStatusChange(application._id, event.target.value)}
                  className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-slate-100"
                >
                  {["applied", "under review", "shortlisted", "interview scheduled", "rejected", "hired"].map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CandidateRankingTable;
