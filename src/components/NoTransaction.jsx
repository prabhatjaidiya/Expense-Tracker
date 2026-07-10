import { FileSearch } from 'lucide-react';
import React from 'react'

const NoTransaction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5">
        <FileSearch size={40} className="text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        No Transactions Found
      </h2>

      <p className="mt-2 text-gray-500 max-w-sm">
        Try changing your search or filters, or add a new transaction to get
        started.
      </p>
    </div>
  );
}

export default NoTransaction
