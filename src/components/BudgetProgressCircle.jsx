import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const BudgetProgressCircle = ({
    percentage = 0,
    progressColor,
    size = 160,
    strokeWidth = 14,
}) => {
    const { theme } = useContext(ThemeContext);

    const progress = Math.min(Math.max(percentage, 0), 100);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference - (progress / 100) * circumference;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                className="-rotate-90"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                    strokeWidth={strokeWidth}
                />

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: "stroke-dashoffset .6s ease",
                    }}
                />
            </svg>

            <div className="absolute text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {progress.toFixed(0)}%
                </h2>

                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Used
                </p>
            </div>
        </div>
    );
};

export default BudgetProgressCircle;