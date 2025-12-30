import { Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ProjectCard({ project }) {
  const { projects, setProjects } = useApp();

  const statusColors = {
    Active: "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-100",
    Completed: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-100",
    "On Hold": "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-100",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-100",
    Medium: "bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-100",
    Low: "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-100",
  };

  const removeProject = () => {
    if (confirm(`Are you sure you want to remove "${project.name}"?`)) {
      setProjects(projects.filter((p) => p.id !== project.id));
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200">
      
      {/* Project Name */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {project.name}
      </h2>

      {/* Project Description */}
      {project.description && (
        <p className="text-green-700 dark:text-gray-400 text-lg leading-relaxed">
          {project.description.length > 100
            ? project.description.slice(0, 100) + "..."
            : project.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex gap-2 flex-wrap mt-2">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}>
          {project.status}
        </span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColors[project.priority]}`}>
          {project.priority} Priority
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {project.progress}% completed
        </p>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={removeProject}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-700/30 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600/50 shadow-sm transition-all"
          title="Delete Project"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
