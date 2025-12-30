import { Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function TaskCard({ task }) {
  const { tasks, setTasks } = useApp();

  const removeTask = () => {
    if (confirm(`Remove task "${task.title}"?`)) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  };

  const statusStyles = {
    "To Do": "bg-red-300 text-gray-800 dark:bg-gray-700/40 dark:text-gray-200",
    "In Progress": "bg-blue-200 text-blue-900 dark:bg-blue-700/30 dark:text-blue-100",
    "Completed": "bg-green-200 text-green-900 dark:bg-green-700/30 dark:text-green-100",
    "Overdue": "bg-yellow-400 text-yellow-900 dark:bg-yellow-700/30 dark:text-yellow-100",
  };

  return (
  <div className="relative bg-gradient-to-br from-white/80 via-blue-50/50 to-white/80 dark:from-gray-900/80 dark:via-gray-800/50 dark:to-gray-900/80 border border-blue-100/40 dark:border-blue-900/30 rounded-3xl p-6 flex flex-col gap-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">

    {/* Task Title */}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
      {task.title}
    </h2>

      {/* Task Description */}
      {task.description && (
        <p className="text-red-900 dark:text-gray-400 text-lg">
          {task.description.length > 80
            ? task.description.slice(0, 80) + "..."
            : task.description}
        </p>
      )}

      {/* Status Badge */}
      <span className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${statusStyles[task.status]}`}>
        {task.status}
      </span>

      {/* Delete Button */}
      <div className="flex justify-end mt-2">
         <button
    onClick={removeTask}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-700/30 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600/50 shadow-sm transition-all"
    title="Delete Task"
  >
    <Trash2 size={18} />
  </button>
      </div>
    </div>
  );
}
