import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const PublicLayout = () => (
  <div className="app-shell min-h-screen">
    <Navbar />
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;
