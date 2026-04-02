const ScoreBadge = ({ score = 0 }) => {
  const tone =
    score >= 80
      ? "bg-emerald-500/20 text-emerald-300"
      : score >= 55
        ? "bg-amber-500/20 text-amber-200"
        : "bg-rose-500/20 text-rose-200";

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{score}/100</span>;
};

export default ScoreBadge;
