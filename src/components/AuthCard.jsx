import React from 'react'

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md transition-colors bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {children}

    </div>
  );
};

export default AuthCard;