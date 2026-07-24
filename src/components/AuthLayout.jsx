import React from "react";
import { Wallet } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">

        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />

        <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center justify-center px-12 text-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">
            <Wallet size={40} />
          </div>

          <h1 className="text-5xl font-bold">
            Expense Tracker
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-indigo-100">
            Take control of your finances with smart budgeting,
            insightful analytics, and beautiful reports—all in one place.
          </p>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default AuthLayout;