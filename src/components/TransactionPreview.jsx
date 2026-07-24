import React, { useContext } from 'react'
import TransactionTable from './TransactionTable'
import ExpenseContext from '../context/ExpenseContext'

const TransactionPreview = () => {
    const { filteredTransactions, totalTransaction } = useContext(ExpenseContext)
    
    return (
        <div>
            <h2 className='text-xl font-bold ml-4 mb-1'>
                Transections Preview
            </h2>
            <p className='ml-4 text-gray-700'>
                showing {totalTransaction === 0 ? "0" : "1"} to {Math.min(10,totalTransaction)} of {totalTransaction} transections.
            </p>
            <div className="overflow-y-auto mb-10 lg:m-4 overflow-x-auto rounded-xl border border-gray-200 bg-white text-black hide-scrollbar dark:bg-gray-900 dark:border-gray-800 dark:text-white">
                <TransactionTable
                    transactions={filteredTransactions.slice(0, 10)}
                />
            </div>
        </div>
    )
}

export default TransactionPreview
