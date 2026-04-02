const StatCard = ({ title, value, accent }) => (
  <div className="panel p-5">
    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
    <div className="mt-3 flex items-end justify-between">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
        Live
      </span>
    </div>
  </div>
);

export default StatCard;
