import { useContext, useMemo, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import TransectionTable from "../components/TransactionTable";
import SearchBox from "../components/SearchBox";
import NoTransaction from "../components/NoTransaction";

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContext);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    // Search
    data = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter
    if (filter !== "all") {
      data = data.filter(
        (item) =>
          item.type.toLowerCase() === filter.toLowerCase() ||
          item.category.toLowerCase() === filter.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      case "oldest":
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case "highest":
        data.sort((a, b) => b.amount - a.amount);
        break;

      case "lowest":
        data.sort((a, b) => a.amount - b.amount);
        break;

      default:
        break;
    }

    return data;
  }, [transactions, searchTerm, filter, sortBy]);

  return (
    <div className="bg-white rounded-2xl h-full pt-6 px-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex flex-col sm:flex-row gap-3">
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

      <div className="overflow-y-auto max-h-[500px] overflow-x-auto rounded-xl border border-gray-200 bg-white">
        {transactions.length === 0 ? (
          <NoTransaction />
        ) : filteredTransactions.length === 0 ? (
          <div className="flex h-60 items-center justify-center text-gray-500">
            No matching transactions found.
          </div>
        ) : (
          <TransectionTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  )
};

export default RecentTransactions;