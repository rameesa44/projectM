import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    // Sample projects (replace with real data)
    { id: 1, name: "Website Redesign", description: "Redesign company website", status: "Active", priority: "High" },
    { id: 2, name: "Mobile App", description: "Develop mobile app", status: "On Hold", priority: "Medium" },
    { id: 3, name: "Marketing Campaign", description: "Launch social media campaign", status: "Completed", priority: "Low" },
  ]);

  const [tasks, setTasks] = useState([
    // Sample tasks (replace with real data)
    { id: 1, title: "Design homepage", description: "Create homepage mockup", status: "To Do" },
    { id: 2, title: "Develop login screen", description: "Implement login functionality", status: "In Progress" },
    { id: 3, title: "Fix bugs", description: "Resolve reported issues", status: "Overdue" },
    { id: 4, title: "Update content", description: "Refresh website content", status: "Completed" },
  ]);

  const [projectSearch, setProjectSearch] = useState("");
  const [taskSearch, setTaskSearch] = useState("");

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
        tasks,
        setTasks,
        projectSearch,
        setProjectSearch,
        taskSearch,
        setTaskSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
