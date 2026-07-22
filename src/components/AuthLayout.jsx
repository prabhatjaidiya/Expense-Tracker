import React from "react";
import { Wallet } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">

        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 ml-24 flex flex-col justify-center items-center text-center px-12">

          <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-6">
            <Wallet size={40} />
          </div>

          <h1 className="text-5xl font-bold">
            Expense Tracker
          </h1>

          <p className="mt-6  text-lg text-indigo-100 leading-relaxed max-w-md">
            Take control of your finances with smart budgeting,
            insightful analytics, and beautiful reports—all in one place.
          </p>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center p-6">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;