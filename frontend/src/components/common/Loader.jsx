const Loader = ({ label = "Loading..." }) => (
  <div className="panel flex min-h-40 items-center justify-center p-6 text-slate-300">
    {label}
  </div>
);

export default Loader;
