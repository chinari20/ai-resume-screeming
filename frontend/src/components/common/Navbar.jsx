import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navClass = ({ isActive }) =>
  `text-sm ${isActive ? "text-white" : "text-slate-300"} transition hover:text-white`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold tracking-[0.3em] text-white">
          HIREAI
        </Link>
        <nav className="flex items-center gap-5">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={navClass}>
            Jobs
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
<<<<<<< HEAD
          {/* <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink> */}
=======
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
>>>>>>> c41b4117e26aed73fad155e243cf759c149382a3
          {user ? (
            <>
              <Link
                to={`/${user.role}`}
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Dashboard
              </Link>
              <button onClick={logout} className="text-sm text-slate-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-brand-400 px-4 py-2 text-sm font-semibold text-brand-100"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
