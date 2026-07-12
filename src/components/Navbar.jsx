import { GrAdd } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CiDark } from "react-icons/ci";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import logo from "../assets/icons/icon.jpeg";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { loadDemoData, clearAllTransactions, transactions } =
    useContext(ExpenseContext);

  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/add-expense": "Add Transaction",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const pageTitle =
    location.pathname.startsWith("/add-expense")
      ? "Add Transaction"
      : pageTitles[location.pathname] || "Expense Tracker";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        <div className="flex justify-between items-center w-full">

          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img src={logo} className="h-8 w-8 rounded-xl" />

            {/* Logo text (desktop only) */}
            <h2 className="hidden lg:block font-semibold">
              Expense Tracker
            </h2>

            {/* Welcome (desktop) / Page name (mobile) */}
            <div className="lg:ml-12">
              <h3 className="lg:hidden text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {pageTitle}
              </h3>

              <div className="hidden lg:block">
                <h3 className="text-2xl font-bold">
                  Welcome back, Prabhat! 👋
                </h3>
                <p className="text-gray-500">
                  Here's your financial overview.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link to="/add-expense">
              <button className="hidden lg:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow hover:shadow-lg">
                <GrAdd />
                Add Transaction
              </button>
            </Link>
            {transactions.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete all transactions?")) {
                      clearAllTransactions();
                    }
                  }}
                  className="lg:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white lg:px-4 lg:py-2 px-2 py-1 rounded-lg transition duration-300 shadow hover:shadow-lg"
                >
                  Clear Data
                </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;