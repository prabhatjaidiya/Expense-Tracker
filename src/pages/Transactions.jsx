import { useContext, useEffect, useMemo, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import TransectionTable from "../components/TransactionTable";
import SearchBox from "../components/SearchBox";
import NoTransaction from "../components/NoTransaction";
import SkeletonCard from "../components/SkeletonCard";
import { ArrowUpDown, Filter, SearchX } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContext);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
    <PageWrapper>
      <div className="bg-white text-black border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-white rounded-2xl h-full pt-6 px-6">
        {/* Header */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500 dark:text-gray-400" />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown
                size={18}
                className="text-gray-500 dark:text-gray-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>

          </div>
        </div>

        <div className="overflow-y-auto max-h-[500px] hide-scrollbar overflow-x-auto rounded-xl border border-gray-200 bg-white text-black dark:bg-gray-900 dark:border-gray-800 dark:text-white">

          {loading ? (
            <div className="p-4 space-y-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <SkeletonCard className="h-10 w-10 rounded-full" />

                    <div className="space-y-2">
                      <SkeletonCard className="h-4 w-40" />
                      <SkeletonCard className="h-3 w-24" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <SkeletonCard className="h-4 w-20" />
                    <SkeletonCard className="h-8 w-8 rounded-lg" />
                    <SkeletonCard className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <NoTransaction />
          ) : filteredTransactions.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <SearchX
                  size={40}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                No matching transactions
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                Try changing your search, filter, or sorting options to find the transactions you're looking for.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                  setSortBy("newest");
                }}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <TransectionTable transactions={filteredTransactions} />
          )}

        </div>
      </div >
    </PageWrapper>
  )
};

export default RecentTransactions;