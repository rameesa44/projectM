import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-72 min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 shadow-2xl">

      {/* Logo */}
      <div className="flex justify-center pt-8">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          PM
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-5 px-6">
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
          Project Manager
        </h2>
        <p className="mt-2 text-[11px] font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
          Task Tracking System
        </p>
      </div>

      <div className="mt-7 mx-6 border-t border-gray-200 dark:border-gray-700/60" />

      {/* Navigation */}
      <nav className="mt-6 px-4 space-y-2">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarLink to="/projects" icon={<FolderKanban size={20} />} label="Projects" />
        <SidebarLink to="/tasks" icon={<CheckSquare size={20} />} label="Tasks" />

       {user?.role === "Admin" && (
        <SidebarLink to="/users" icon={<Settings />} label="Users" />
      )}
      </nav>
    </aside>
  );
}

/* Reusable Link */
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-5 py-4 rounded-xl text-[15px] font-semibold transition-all
        ${
          isActive
            ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800 hover:shadow"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
