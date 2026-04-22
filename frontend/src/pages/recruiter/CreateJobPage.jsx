import { useState } from "react";
import { recruiterApi } from "../../services/api";

const initialForm = {
  title: "",
  companyName: "",
  location: "",
  jobType: "Full-time",
  salaryRange: "",
  requiredSkills: "",
  preferredSkills: "",
  minimumExperience: 0,
  educationRequirement: "",
  jobDescription: "",
  status: "open",
};

const CreateJobPage = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await recruiterApi.createJob({
      ...form,
      requiredSkills: form.requiredSkills.split(",").map((item) => item.trim()).filter(Boolean),
      preferredSkills: form.preferredSkills.split(",").map((item) => item.trim()).filter(Boolean),
    });
    setForm(initialForm);
    setMessage("Job created successfully.");
  };

  return (
    <form className="panel grid gap-4 p-6 md:grid-cols-2" onSubmit={handleSubmit}>
      {Object.entries(form).map(([key, value]) => (
        key === "jobDescription" ? (
          <textarea
            key={key}
            placeholder={key}
            value={value}
            onChange={(event) => setForm({ ...form, [key]: event.target.value })}
            className="min-h-40 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white md:col-span-2"
          />
        ) : (
          <input
            key={key}
            placeholder={key}
            value={value}
            onChange={(event) => setForm({ ...form, [key]: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          />
        )
      ))}
      <button className="rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-slate-950 md:col-span-2">
        Publish job
      </button>
      {message && <p className="text-sm text-brand-100 md:col-span-2">{message}</p>}
    </form>
  );
};

export default CreateJobPage;
