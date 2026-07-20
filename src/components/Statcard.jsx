import React from "react";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";

const StatCard = ({
  heading,
  amount,
  icon,
  bg,
  percentage,
  isPositive = true,
  compareText = "vs last period",
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div>
          <h3 className="text-sm text-gray-500 font-medium">{heading}</h3>

          <h2 className="lg:text-2xl font-semibold lg:font-bold text-gray-900 mt-1">
            {amount}
          </h2>

          {/* Percentage */}
          <div className="flex items-center mt-2 text-sm">
            <span
              className={`flex items-center font-semibold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? (
                <GoArrowUpRight className="mr-1" />
              ) : (
                <GoArrowDownRight className="" />
              )}
              {percentage}%
            </span>

            <span className="text-gray-500 ml-2 text-xs">
              {compareText}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="w-16 h-16 rounded-full flex items-start justify-center text-2xl"
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;