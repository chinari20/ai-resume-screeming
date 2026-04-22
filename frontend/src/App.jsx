import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminJobsPage from "./pages/admin/AdminJobsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AuthPage from "./pages/auth/AuthPage";
import ApplicationsPage from "./pages/candidate/ApplicationsPage";
import CandidateDashboardPage from "./pages/candidate/CandidateDashboardPage";
import CandidateProfilePage from "./pages/candidate/CandidateProfilePage";
import RecommendedJobsPage from "./pages/candidate/RecommendedJobsPage";
import ResumeUploadPage from "./pages/candidate/ResumeUploadPage";
import AboutPage from "./pages/public/AboutPage";
<<<<<<< HEAD
=======
import ContactPage from "./pages/public/ContactPage";
>>>>>>> c41b4117e26aed73fad155e243cf759c149382a3
import HomePage from "./pages/public/HomePage";
import JobDetailsPage from "./pages/public/JobDetailsPage";
import JobsPage from "./pages/public/JobsPage";
import CreateJobPage from "./pages/recruiter/CreateJobPage";
import JobApplicantsPage from "./pages/recruiter/JobApplicantsPage";
import ManageJobsPage from "./pages/recruiter/ManageJobsPage";
import RecruiterDashboardPage from "./pages/recruiter/RecruiterDashboardPage";
import RecruiterProfilePage from "./pages/recruiter/RecruiterProfilePage";

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
<<<<<<< HEAD
      {/* <Route path="/contact" element={<ContactPage />} /> */}
=======
      <Route path="/contact" element={<ContactPage />} />
>>>>>>> c41b4117e26aed73fad155e243cf759c149382a3
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
    </Route>

    <Route element={<ProtectedRoute roles={["candidate"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/candidate" element={<CandidateDashboardPage />} />
        <Route path="/candidate/profile" element={<CandidateProfilePage />} />
        <Route path="/candidate/resume" element={<ResumeUploadPage />} />
        <Route path="/candidate/applications" element={<ApplicationsPage />} />
        <Route path="/candidate/recommended-jobs" element={<RecommendedJobsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={["recruiter"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/recruiter" element={<RecruiterDashboardPage />} />
        <Route path="/recruiter/profile" element={<RecruiterProfilePage />} />
        <Route path="/recruiter/jobs/create" element={<CreateJobPage />} />
        <Route path="/recruiter/jobs" element={<ManageJobsPage />} />
        <Route path="/recruiter/jobs/:id/applicants" element={<JobApplicantsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={["admin"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/jobs" element={<AdminJobsPage />} />
        <Route path="/admin/applications" element={<AdminApplicationsPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
