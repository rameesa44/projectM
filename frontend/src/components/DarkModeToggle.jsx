import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" size={18} />
      ) : (
        <Moon className="text-gray-900 dark:text-white" size={18} />
      )}
    </button>
  );
}
