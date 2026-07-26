import {
    Car,
    Landmark,
    ShoppingBag,
    Utensils,
    Wallet,
    Receipt,
    Film,
    GraduationCap,
    Heart,
} from "lucide-react";
import { useContext, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import ExpenseContext from '../context/ExpenseContext';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmModal from "./ConfirmModal";

const categoryColors = {
    Food:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

    Shopping:
        "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",

    Transport:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

    Bills:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",

    Entertainment:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

    Education:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",

    Health:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

    Salary:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

    Income:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

const getCategoryIcon = (category) => {
    switch (category) {
        case "Shopping":
            return <ShoppingBag size={18} className="text-pink-500 dark:text-pink-400" />;

        case "Food":
            return <Utensils size={18} className="text-orange-500 dark:text-orange-400" />;

        case "Transport":
            return <Car size={18} className="text-blue-500 dark:text-blue-400" />;

        case "Salary":
            return <Wallet size={18} className="text-green-500 dark:text-green-400" />;
        case "Bills":
            return <Receipt size={18} className="text-orange-500 dark:text-orange-400" />;

        case "Entertainment":
            return <Film size={18} className="text-purple-500 dark:text-purple-400" />;

        case "Education":
            return <GraduationCap size={18} className="text-indigo-500 dark:text-indigo-400" />;

        case "Health":
            return <Heart size={18} className="text-red-500 dark:text-red-400" />;

        case "Income":
            return <Wallet size={18} className="text-green-500 dark:text-green-400" />;

        default:
            return <Landmark size={18} className="text-gray-500 dark:text-gray-400" />;
    }
};

const TransactionTable = ({ transactions }) => {
    const navigate = useNavigate();
    const { deleteTransaction } = useContext(ExpenseContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleDelete = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteTransaction(selectedTransaction.id);

        setShowDeleteModal(false);
        setSelectedTransaction(null);
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.04,
                duration: 0.25,
            },
        }),
    };


    return (
        <>
            <table className="w-full">

                <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">

                    <tr className="text-sm text-gray-500 dark:text-gray-400">

                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Title</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Category</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Date</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Method</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Type</th>
                        <th className="pb-4 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.map((item, index) => (

                        <motion.tr
                            key={item.id}
                            custom={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-md duration-200"
                        >

                            {/* Title */}

                            <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                {item.title}
                            </td>

                            {/* Category */}

                            <td className='py-4 px-4'>

                                <div className="flex items-center gap-3">

                                    {getCategoryIcon(item.category)}

                                    <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[item.category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                        }`}>
                                        {item.category}
                                    </span>

                                </div>

                            </td>

                            {/* Amount */}

                            <td
                                className={`font-bold py-4 px-4 whitespace-nowrap ${item.type === "income"
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {item.type === "income" ? "+" : "-"}
                                ₹{Number(item.amount).toLocaleString("en-IN")}
                            </td>

                            {/* Date */}

                            <td className="py-4 px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                {new Date(item.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>

                            {/* Payment */}

                            <td className='py-4 px-4 whitespace-nowrap'>

                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm dark:bg-blue-900/30 dark:text-blue-300">

                                    {item.paymentMethod}

                                </span>

                            </td>

                            {/* Type */}

                            <td className='py-4 px-4'>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${item.type === "income"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                        }`}
                                >
                                    {item.type}
                                </span>
                            </td>

                            {/* Action */}

                            <td className='py-4 px-4'>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        onClick={() => navigate(`/add-expense/${item.id}`)}
                                    >
                                        <FiEdit2 size={18} />
                                    </button>

                                    <button
                                        className="text-red-600 hover:text-red-800 cursor-pointer transition-colors dark:text-red-400 dark:hover:text-red-300"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </td>

                        </motion.tr>

                    ))}

                </tbody>

            </table>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedTransaction(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Transaction?"
                message={`Are you sure you want to delete "${selectedTransaction?.title}"?`}
            />
        </>
    )
}

export default TransactionTable
