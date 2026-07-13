import { useContext, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import TransectionTable from "../components/TransactionTable";
import SearchBox from "../components/SearchBox";
import NoTransaction from "../components/NoTransaction";

const RecentTransactions = () => {

  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useContext(ExpenseContext);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  let filteredTransactions = [...transactions];

  filteredTransactions = filteredTransactions.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filter !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) =>
        item.type.toLowerCase() === filter.toLowerCase() ||
        item.category.toLowerCase() === filter.toLowerCase()
    );
  }

  switch (sortBy) {
    case "newest":
      filteredTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      break;

    case "oldest":
      filteredTransactions.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      break;

    case "highest":
      filteredTransactions.sort((a, b) => b.amount - a.amount);
      break;

    case "lowest":
      filteredTransactions.sort((a, b) => a.amount - b.amount);
      break;

    default:
      break;
  }

  return (
    <div className="bg-white rounded-2xl h-full pt-6 px-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex gap-4 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[500px] overflow-x-auto">
      {filteredTransactions.length > 0 ? (
        <TransectionTable transactions={filteredTransactions} />
      ) : (
        <NoTransaction />
      )}
      </div>
    </div>
  );
};

export default RecentTransactions;