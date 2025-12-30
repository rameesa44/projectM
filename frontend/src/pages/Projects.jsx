import { useState } from "react";
import { useApp } from "../context/AppContext";
import ProjectCard from "../components/ProjectCard";
import { Plus, X } from "lucide-react";

export default function Projects() {
  const { projects, setProjects } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
    priority: "Medium",
    progress: 0,
  });

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    const matchesPriority = !priorityFilter || p.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const saveProject = () => {
    if (!form.name.trim()) return;
    setProjects([...projects, { id: Date.now(), ...form }]);
    setForm({ name: "", description: "", status: "Active", priority: "Medium", progress: 0 });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track your projects
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg transition-colors duration-200"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-6">

        <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search projects..."
  className="w-full md:w-139 px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
/>


       <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="w-full md:w-32 px-3 py-2 text-sm rounded-xl border bg-white-100 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
>
  <option value="">Status</option>
  <option value="Active">Active</option>
  <option value="Completed">Completed</option>
  <option value="On Hold">On Hold</option>
</select>

<select
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
  className="w-full md:w-32 px-3 py-2 text-sm rounded-xl border bg-white-100 dark:bg-gray-100 dark:border-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
>
  <option value="">Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
</div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 scale-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New Project
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Project name"
                className="w-full px-2 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />

              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Project description"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
              />

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>

              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                onClick={saveProject}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg transition-colors duration-200"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center mt-10">
            No projects found.
          </p>
        )}

        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
