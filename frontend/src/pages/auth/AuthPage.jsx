import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthPage = ({ mode }) => {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    companyName: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authAction = isRegister ? register : login;
      const payload = isRegister ? form : { email: form.email, password: form.password };
      const user = await authAction(payload);
      const redirectTo = location.state?.from?.pathname || `/${user.role}`;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md panel p-8">
      <h1 className="text-3xl font-bold text-white">{isRegister ? "Create account" : "Welcome back"}</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {isRegister && (
          <input
            placeholder="Full name"
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        )}
        <input
          placeholder="Email"
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        {isRegister && (
          <>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {form.role === "recruiter" && (
              <input
                placeholder="Company name"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                value={form.companyName}
                onChange={(event) => setForm({ ...form, companyName: event.target.value })}
              />
            )}
          </>
        )}
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button className="w-full rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-slate-950">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-300">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link to={isRegister ? "/login" : "/register"} className="text-brand-200">
          {isRegister ? "Login" : "Register"}
        </Link>
      </p>
    </div>
  );
};

export default AuthPage;
