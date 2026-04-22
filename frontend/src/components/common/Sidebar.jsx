import { NavLink } from "react-router-dom";

const Sidebar = ({ items }) => (
  <aside className="panel h-fit p-4">
    <div className="mb-4 px-3 text-xs uppercase tracking-[0.4em] text-slate-400">Workspace</div>
    <div className="space-y-2">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block rounded-2xl px-4 py-3 text-sm transition ${
              isActive ? "bg-brand-500 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  </aside>
);

export default Sidebar;
