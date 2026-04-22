const EmptyState = ({ title, description }) => (
  <div className="panel p-8 text-center">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-300">{description}</p>
  </div>
);

export default EmptyState;
