import { useState } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Plus, X } from "lucide-react";

export default function Tasks() {
  const { tasks, setTasks } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", status: "To Do" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "" means all statuses

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setForm({ title: "", status: "To Do" });
  };

  const saveTask = () => {
    if (!form.title.trim()) return;
    setTasks([...tasks, { id: Date.now(), ...form }]);
    closeModal();
  };

  // Filter tasks by search and status
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || t.status === statusFilter)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize and complete your work efficiently
          </p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg transition-colors duration-200"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      {/* Search + Status Filter */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-150 lg:w-150
    px-4 py-3 rounded-xl
    border border-gray-300 dark:border-gray-700
    bg-gray-100 dark:bg-gray-800
    text-gray-800 dark:text-white text-sm
    focus:ring-2 focus:ring-blue-500
    shadow-sm transition-all"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl
    border border-gray-300 dark:border-gray-700
    bg-gray-100 dark:bg-gray-800
    text-gray-800 dark:text-white text-sm
    focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTasks.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center mt-8">
            No tasks found.
          </p>
        )}

        {filteredTasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Task
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Task title"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Task description"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white resize-none"
              />

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-white"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={saveTask}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
