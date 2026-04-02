import { useState } from "react";
import { candidateApi } from "../../services/api";

const ResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const { data } = await candidateApi.uploadResume(formData);
      setResult(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="panel p-6">
      <h1 className="text-2xl font-bold text-white">Upload Resume</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="block w-full rounded-2xl border border-dashed border-white/20 bg-slate-900 p-4 text-slate-200"
        />
        <button className="rounded-2xl bg-brand-500 px-5 py-3 font-semibold text-slate-950">Parse and save</button>
      </form>
      {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
      {result && (
        <div className="mt-6 rounded-2xl bg-white/5 p-5">
          <h2 className="font-semibold text-white">Parsed output</h2>
          <p className="mt-2 text-sm text-slate-300">Name: {result.resume.extractedName}</p>
          <p className="text-sm text-slate-300">Email: {result.resume.extractedEmail}</p>
          <p className="text-sm text-slate-300">Skills: {result.resume.extractedSkills.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPage;
