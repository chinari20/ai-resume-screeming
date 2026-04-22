import { useEffect, useState } from "react";
import { candidateApi } from "../../services/api";

const CandidateProfilePage = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    headline: "",
    summary: "",
    skills: "",
    github: "",
    linkedin: "",
    totalExperienceYears: 0,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    candidateApi.getProfile().then(({ data }) => {
      if (!data) return;
      setForm({
        fullName: data.fullName || "",
        phone: data.phone || "",
        location: data.location || "",
        headline: data.headline || "",
        summary: data.summary || "",
        skills: (data.skills || []).join(", "),
        github: data.github || "",
        linkedin: data.linkedin || "",
        totalExperienceYears: data.totalExperienceYears || 0,
      });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await candidateApi.updateProfile({
      ...form,
      skills: form.skills.split(",").map((item) => item.trim()).filter(Boolean),
    });
    setMessage("Profile saved.");
  };

  return (
    <form className="panel grid gap-4 p-6 md:grid-cols-2" onSubmit={handleSubmit}>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          placeholder={key}
          type={key === "totalExperienceYears" ? "number" : "text"}
          value={value}
          onChange={(event) => setForm({ ...form, [key]: event.target.value })}
          className={`rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white ${key === "summary" ? "md:col-span-2" : ""}`}
        />
      ))}
      <button className="rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-slate-950 md:col-span-2">
        Save profile
      </button>
      {message && <p className="text-sm text-brand-100 md:col-span-2">{message}</p>}
    </form>
  );
};

export default CandidateProfilePage;
