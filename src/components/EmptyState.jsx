import { Database, Link, Plus } from 'lucide-react'
import React, { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext'
import { GrAdd } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const EmptyState = () => {
    const navigate = useNavigate()
    const { loadDemoData } = useContext(ExpenseContext)
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="text-6xl mb-4">📭</div>

            <h2 className="text-2xl font-bold">
                No Transactions Yet
            </h2>

            <p className="text-gray-500 mt-2 text-center">
                Start tracking your income and expenses by adding your first
                transaction.
            </p>

            <div className='flex gap-2 mt-6 justify-center'>
                <button
                    onClick={() => navigate("/add-expense")}
                    className="inline-flex items-center lg:gap-2 bg-blue-600 hover:bg-blue-700 text-white lg:px-5 lg:py-3 whitespace-nowrap px-3 py-2 gap-1 rounded-lg transition-colors duration-200"
                >
                    <Plus size={18} />
                    Add Transaction
                </button>

                <button
                    onClick={loadDemoData}
                    className="inline-flex items-center lg:gap-2 bg-gray-700 hover:bg-gray-800 text-white lg:px-5 lg:py-3 whitespace-nowrap px-3 py-2 gap-1 rounded-lg transition-colors duration-200"
                >
                    <Database size={18} />
                    Load Demo Data
                </button>
            </div>
        </div>
    )
}

export default EmptyState
