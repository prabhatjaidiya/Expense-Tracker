import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import React from 'react'

const AppearanceCard = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return(
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm mb-6 transition-colors">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Appearance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark mode
                </p>
            </div>

            <button
                onClick={toggleTheme}
                className="flex h-11 w-11 items-center justify-center rounded-xl
                 bg-indigo-600 hover:bg-indigo-700
                 text-white transition"
            >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </div>
    </div>
)}

export default AppearanceCard
