import { useEffect, useState } from "react";
import { recruiterApi } from "../../services/api";

const RecruiterProfilePage = () => {
  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    location: "",
    about: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    recruiterApi.getProfile().then(({ data }) => {
      if (data) setForm({ ...form, ...data });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await recruiterApi.updateProfile(form);
    setMessage("Company profile saved.");
  };

  return (
    <form className="panel grid gap-4 p-6 md:grid-cols-2" onSubmit={handleSubmit}>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          placeholder={key}
          value={value}
          onChange={(event) => setForm({ ...form, [key]: event.target.value })}
          className={`rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white ${key === "about" ? "md:col-span-2" : ""}`}
        />
      ))}
      <button className="rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-slate-950 md:col-span-2">
        Save company profile
      </button>
      {message && <p className="text-sm text-brand-100 md:col-span-2">{message}</p>}
    </form>
  );
};

export default RecruiterProfilePage;
