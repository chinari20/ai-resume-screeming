import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

const sidebarConfig = {
  candidate: [
    { label: "Overview", to: "/candidate" },
    { label: "Profile", to: "/candidate/profile" },
    { label: "Resume Upload", to: "/candidate/resume" },
    { label: "Applications", to: "/candidate/applications" },
    { label: "Recommended Jobs", to: "/candidate/recommended-jobs" },
  ],
  recruiter: [
    { label: "Overview", to: "/recruiter" },
    { label: "Company Profile", to: "/recruiter/profile" },
    { label: "Create Job", to: "/recruiter/jobs/create" },
    { label: "Manage Jobs", to: "/recruiter/jobs" },
  ],
  admin: [
    { label: "Overview", to: "/admin" },
    { label: "Users", to: "/admin/users" },
    { label: "Jobs", to: "/admin/jobs" },
    { label: "Applications", to: "/admin/applications" },
  ],
};

const DashboardLayout = () => {
  const { user } = useAuth();
  const items = sidebarConfig[user?.role] || [];

  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar items={items} />
        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
