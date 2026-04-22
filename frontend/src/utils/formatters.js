export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString() : "N/A";

export const formatRoleTitle = (role = "") =>
  role.replace(/^\w/, (char) => char.toUpperCase());

export const getStatusColor = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("short")) return "bg-emerald-500/20 text-emerald-300";
  if (normalized.includes("reject")) return "bg-rose-500/20 text-rose-300";
  if (normalized.includes("interview")) return "bg-amber-500/20 text-amber-200";
  if (normalized.includes("hire")) return "bg-sky-500/20 text-sky-200";
  return "bg-slate-700/50 text-slate-200";
};
