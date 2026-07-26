import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`relative hidden lg:flex h-8 w-16 items-center rounded-full transition-all duration-300 ${theme === "dark"
          ? "bg-indigo-600"
          : "bg-gray-300"
        }`}
    >
      <span
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-all duration-300 ${theme === "dark" ? "translate-x-8" : "translate-x-1"
          }`}
      >
        {theme === "dark" ? (
          <Moon size={16} className="text-indigo-600" />
        ) : (
          <Sun size={16} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitcher;