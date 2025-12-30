import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {
  const { isLoggedIn } = useAuth();

  // 🔓 NOT LOGGED IN → Landing only
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // 🔒 LOGGED IN → Dashboard layout
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <Routes>
            {/* Landing ko login ke baad dashboard par redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />



            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
