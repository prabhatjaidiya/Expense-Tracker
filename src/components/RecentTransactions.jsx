import { useContext, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Car, Landmark, ShoppingBag, Utensils, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionTable from "./TransactionTable";

const categoryColors = {
  Food: "bg-orange-100 text-orange-700",
  Shopping: "bg-pink-100 text-pink-700",
  Transport: "bg-blue-100 text-blue-700",
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

    default:
      return <Landmark size={18} className="text-gray-500" />;
  }
};

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContext);


  const latestTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">
            Latest 5 Transactions
          </p>
        </div>
        <Link to='/transactions' className="font-medium transition-colors text-blue-600 hover:text-blue-700">
          View All →
        </Link>
      </div>
      {latestTransactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-xl px-3 transition-all duration-200"
          >
            <div className="flex items-center gap-4 flex-1 flex-wrap">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                {getCategoryIcon(transaction.category)}
              </div>
              <span className="font-semibold text-gray-800">
                {transaction.title}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[transaction.category] ||
                  "bg-gray-100 text-gray-700"
                  }`}
              >
                {transaction.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div
              className={`font-bold text-lg ${transaction.type === "income"
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {transaction.type === "income" ? "+" : "-"} ₹
              {transaction.amount.toLocaleString("en-IN")}
            </div>
          </div>
        )
      })}
    </div >
  );
};


export default RecentTransactions;