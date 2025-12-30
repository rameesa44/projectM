import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  // ✅ Hook INSIDE component
  const { darkMode, setDarkMode } = useTheme();
  const { setProjectSearch, setTaskSearch } = useApp();

  const [searchValue, setSearchValue] = useState("");

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProjectSearch(searchValue);
      setTaskSearch(searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, setProjectSearch, setTaskSearch]);

  return (
    <header className="flex items-center justify-between px-6 md:px-9 py-4 md:py-6 
      bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">

      {/* Brand */}
      <h1 className="text-2xl md:text-4xl font-bold text-blue-700 dark:text-white tracking-tight">
        TaskTrackerPro
      </h1>

      {/* Search */}
      <div className="relative flex-1 max-w-xl mx-6 hidden md:flex">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
          <Search size={18} />
        </span>

        <input
          type="text"
          placeholder="Search projects, tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border 
            border-gray-300 dark:border-gray-600 
            bg-gray-100 dark:bg-gray-800 
            text-gray-800 dark:text-white 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all shadow-sm"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white 
          flex items-center justify-center font-semibold shadow-md">
          U
        </div>
      </div>
    </header>
  );
}
