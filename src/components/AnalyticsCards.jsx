import React from "react";

const AnalyticsCards = ({ icon, title, amount, description }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <h3 className="text-base lg:text-lg font-semibold text-gray-800">
          {title}
        </h3>
      </div>

      {/* Amount */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">
        {amount}
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default AnalyticsCards;