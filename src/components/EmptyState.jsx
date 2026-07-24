import { Database, Plus } from "lucide-react";
import React, { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
    const navigate = useNavigate();
    const { loadDemoData } = useContext(ExpenseContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <div className="text-6xl mb-4">📭</div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Transactions Yet
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
                Start tracking your income and expenses by adding your first
                transaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                <button
                    onClick={() => navigate("/add-expense")}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-colors duration-200"
                >
                    <Plus size={18} />
                    Add Transaction
                </button>

                <button
                    onClick={loadDemoData}
                    className="inline-flex items-center justify-center gap-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white px-5 py-3 rounded-lg transition-colors duration-200"
                >
                    <Database size={18} />
                    Load Demo Data
                </button>
            </div>
        </div>
    );
};

export default EmptyState;