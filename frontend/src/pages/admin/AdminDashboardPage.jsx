import { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import StatCard from "../../components/common/StatCard";
import Loader from "../../components/common/Loader";
import { adminApi } from "../../services/api";

const AdminDashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    adminApi.getDashboard().then(({ data }) => setDashboard(data));
  }, []);

  if (!dashboard) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard title="Users" value={dashboard.stats.users} accent="bg-brand-500/20 text-brand-100" />
        <StatCard title="Recruiters" value={dashboard.stats.recruiters} accent="bg-sky-500/20 text-sky-100" />
        <StatCard title="Candidates" value={dashboard.stats.candidates} accent="bg-amber-500/20 text-amber-100" />
        <StatCard title="Jobs" value={dashboard.stats.jobs} accent="bg-emerald-500/20 text-emerald-100" />
        <StatCard title="Applications" value={dashboard.stats.applications} accent="bg-rose-500/20 text-rose-100" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-white">Top candidate skills</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.skillAnalytics.map((item) => ({ name: item._id, count: item.count }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-white">Recent activity</h2>
          <div className="mt-4 space-y-3">
            {dashboard.recentApplications.map((application) => (
              <div key={application._id} className="rounded-2xl bg-white/5 p-4">
                <p className="font-medium text-white">{application.candidate?.name} applied to {application.job?.title}</p>
                <p className="mt-1 text-sm text-slate-400">{application.job?.companyName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
