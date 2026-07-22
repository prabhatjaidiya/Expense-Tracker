import React from 'react'

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {children}

    </div>
  );
};

export default AuthCard;