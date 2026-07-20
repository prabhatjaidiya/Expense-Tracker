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
import { useContext } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import ExpenseContext from '../context/ExpenseContext';
import { useNavigate } from "react-router-dom";

const categoryColors = {
    Food: "bg-green-100 text-green-700",
    Shopping: "bg-pink-100 text-pink-700",
    Transport: "bg-blue-100 text-blue-700",
    Bills: "bg-orange-100 text-orange-700",
    Entertainment: "bg-purple-100 text-purple-700",
    Education: "bg-indigo-100 text-indigo-700",
    Health: "bg-red-100 text-red-700",
    Income: "bg-green-100 text-green-700",
    Salary: "bg-green-100 text-green-700",
};

const getCategoryIcon = (category) => {
    switch (category) {
        case "Shopping":
            return <ShoppingBag size={18} className="text-pink-500" />;

        case "Food":
            return <Utensils size={18} className="text-orange-500" />;

        case "Transport":
            return <Car size={18} className="text-blue-500" />;

        case "Salary":
            return <Wallet size={18} className="text-green-600" />;
        case "Bills":
            return <Receipt size={18} className="text-orange-500" />;

        case "Entertainment":
            return <Film size={18} className="text-purple-500" />;

        case "Education":
            return <GraduationCap size={18} className="text-indigo-500" />;

        case "Health":
            return <Heart size={18} className="text-red-500" />;

        case "Income":
            return <Wallet size={18} className="text-green-600" />;

        default:
            return <Landmark size={18} className="text-gray-500" />;
    }
};

const TransactionTable = ({ transactions }) => {
    const navigate = useNavigate();
    const { deleteTransaction } = useContext(ExpenseContext)

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            deleteTransaction(id);
        }
    };

    return (
        <table className="w-full">

            <thead className="sticky top-0 bg-white z-10 shadow-sm">

                <tr className="text-gray-500 text-sm border-b">

                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Title</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Category</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Amount</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Date</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Method</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Type</th>
                    <th className="pb-4 px-4 text-left font-semibold text-gray-600">Actions</th>

                </tr>

            </thead>

            <tbody>

                {transactions.map((item) => (

                    <tr
                        key={item.id}
                        className="border-b last:border-b-0 hover:bg-slate-50 transition-colors duration-200"
                    >

                        {/* Title */}

                        <td className="py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">
                            {item.title}
                        </td>

                        {/* Category */}

                        <td className='py-4 px-4'>

                            <div className="flex items-center gap-3">

                                {getCategoryIcon(item.category)}

                                <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[item.category] || "bg-gray-100 text-gray-700"
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

                        <td className="text-gray-500 py-4 px-4 whitespace-nowrap">
                            {new Date(item.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </td>

                        {/* Payment */}

                        <td className='py-4 px-4 whitespace-nowrap'>

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                                {item.paymentMethod}

                            </span>

                        </td>

                        {/* Type */}

                        <td className='py-4 px-4'>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${item.type === "income"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {item.type}
                            </span>
                        </td>

                        {/* Action */}

                        <td className='py-4 px-4'>
                            <div className="flex items-center gap-3">
                                <button
                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    onClick={() => navigate(`/add-expense/${item.id}`)}
                                >
                                    <FiEdit2 size={18} />
                                </button>

                                <button
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    )
}

export default TransactionTable
