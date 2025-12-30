import { useState } from "react";
import { useApp } from "../context/AppContext";
import StatCard from "../components/StatCard";
import { ClipboardList, CheckCircle, AlertTriangle, Layers } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { projects, tasks, projectSearch, taskSearch } = useApp();

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);

  // Filter by search
  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(projectSearch.toLowerCase()))
  );

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(taskSearch.toLowerCase()))
  );

  // Count task and project statuses
  const taskStatusCount = {
    "To Do": tasks.filter((t) => t.status === "To Do").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
    Overdue: tasks.filter((t) => t.status === "Overdue").length,
  };

  const projectStatusCount = {
    Active: projects.filter((p) => p.status === "Active").length,
    Completed: projects.filter((p) => p.status === "Completed").length,
    "On Hold": projects.filter((p) => p.status === "On Hold").length,
  };

  const projectPriorityCount = {
    High: projects.filter((p) => p.priority === "High").length,
    Medium: projects.filter((p) => p.priority === "Medium").length,
    Low: projects.filter((p) => p.priority === "Low").length,
  };

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  const taskData = Object.entries(taskStatusCount).map(([name, value]) => ({ name, value }));
  const projectData = Object.entries(projectStatusCount).map(([name, value]) => ({ name, value }));
  const priorityData = Object.entries(projectPriorityCount).map(([name, value]) => ({ name, value }));

  const PROJECT_LIMIT = 4;
  const TASK_LIMIT = 5;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back 👋</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here’s what's happening with your projects today</p>
      </div>

      {/* Stat Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

  <StatCard
    title="Total Projects"
    value={projects.length}
    icon={<Layers className="text-indigo-600" />}
    color="bg-indigo-100 dark:bg-indigo-500/20"
  />

  <StatCard
    title="My Tasks"
    value={tasks.length}
    icon={<ClipboardList className="text-purple-600" />}
    color="bg-purple-100 dark:bg-purple-500/20"
  />

  <StatCard
    title="Completed Tasks"
    value={taskStatusCount.Completed}
    icon={<CheckCircle className="text-green-600" />}
    color="bg-green-100 dark:bg-green-500/20"
  />

  <StatCard
    title="Overdue"
    value={taskStatusCount.Overdue}
    icon={<AlertTriangle className="text-yellow-600" />}
    color="bg-yellow-100 dark:bg-yellow-500/20"
  />

</div>


      {/* Projects & Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h3>
          {filteredProjects.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No projects found</p>
          ) : (
            <div className="space-y-4">
              {(showAllProjects ? filteredProjects : filteredProjects.slice(0, PROJECT_LIMIT)).map((project) => (
                <div key={project.id} className="flex justify-between items-start bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {project.description
                        ? project.description.length > 100
                          ? project.description.slice(0, 100) + "..."
                          : project.description
                        : "No description"}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      project.priority === "High"
                        ? "bg-red-200 text-red-800 dark:bg-red-700/30 dark:text-red-100"
                        : project.priority === "Medium"
                        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700/30 dark:text-yellow-100"
                        : "bg-green-200 text-green-800 dark:bg-green-700/30 dark:text-green-100"
                    }`}>
                      {project.priority} Priority
                    </span>
                  </div>
                  <span
                    className={`text-sm font-medium ml-4 flex-shrink-0 px-3 py-1 rounded-full ${
                      project.status === "Active"
                        ? "bg-green-200 text-green-800 dark:bg-green-700/30 dark:text-green-100"
                        : project.status === "Completed"
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-700/30 dark:text-blue-100"
                        : "bg-yellow-200 text-yellow-800 dark:bg-yellow-700/30 dark:text-yellow-100"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
              {filteredProjects.length > PROJECT_LIMIT && (
                <button onClick={() => setShowAllProjects(!showAllProjects)} className="text-blue-600 dark:text-blue-400 mt-2 text-sm hover:underline">
                  {showAllProjects ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">My Tasks</h3>
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
          ) : (
            <div className="space-y-4">
              {(showAllTasks ? filteredTasks : filteredTasks.slice(0, TASK_LIMIT)).map((task) => (
                <div key={task.id} className="flex justify-between items-start bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</p>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {task.description.length > 100 ? task.description.slice(0, 100) + "..." : task.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ml-4 flex-shrink-0 px-3 py-1 rounded-full ${
                      task.status === "To Do"
                        ? "bg-gray-200 text-gray-700 dark:bg-gray-700/30 dark:text-gray-200"
                        : task.status === "In Progress"
                        ? "bg-blue-200 text-blue-700 dark:bg-blue-800/30 dark:text-blue-200"
                        : task.status === "Completed"
                        ? "bg-green-200 text-green-800 dark:bg-green-700/30 dark:text-green-200"
                        : "bg-red-200 text-red-700 dark:bg-red-700/30 dark:text-red-200"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
              {filteredTasks.length > TASK_LIMIT && (
                <button onClick={() => setShowAllTasks(!showAllTasks)} className="text-blue-600 dark:text-blue-400 mt-2 text-sm hover:underline">
                  {showAllTasks ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ChartCard
    title="Task Statistics"
    data={taskData}
    emptyLabel="No Tasks Yet"
  />
  <ChartCard
    title="Project Statistics"
    data={projectData}
    emptyLabel="No Projects Yet"
  />
</div>

    </div>
  );
}

// Chart Card Component
// Chart Card Component
function ChartCard({ title, data, emptyLabel }) {
  const isEmpty = data.every((d) => d.value === 0);

  const chartData = isEmpty
    ? [{ name: emptyLabel, value: 100 }]
    : data;

  const COLORS = isEmpty
    ? ["#e5e7eb"]
    : ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={4}
              labelLine={false}
              label={({ name, percent }) =>
                !isEmpty
                  ? `${name} ${(percent * 100).toFixed(0)}%`
                  : ""
              }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isEmpty ? emptyLabel : "Overview"}
          </p>
        </div>
      </div>
    </div>
  );
}
