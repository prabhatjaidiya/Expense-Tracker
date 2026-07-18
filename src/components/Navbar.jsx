import { GrAdd } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CiDark } from "react-icons/ci";
import { useContext, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import logo from "../assets/icons/icon.jpeg";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarDays,
  Filter,
  Download,
  ChevronDown,
} from "lucide-react";
import exportCSV from "../utils/exportCSV";
import exportPDF from "../utils/exportPDF";


const Navbar = () => {
  const {
    loadDemoData,
    clearAllTransactions,
    transactions,
    dateRange,
    setDateRange,
    filteredTransactions,
    totalIncome,
    totalExpense,
    totalBalance } =
    useContext(ExpenseContext);


  const location = useLocation();

  const pageTitlesDesktop = {
    "/": {
      title: "Dashboard",
      subtitle: "Welcome back! Here's your financial overview."
    },
    "/transactions": {
      title: "Transactions",
      subtitle: "Manage all your income and expenses."
    },
    "/add-expense": {
      title: "Add Transaction",
      subtitle: "Record a new income or expense."
    },
    "/analytics": {
      title: "Analytics",
      subtitle: "Track your spending with detailed insights."
    },
    "/budget": {
      title: "Budget Planning",
      subtitle: "Set budgets and monitor your spending."
    },
    "/reports": {
      title: "Reports",
      subtitle: "Export and review your financial reports."
    },
    "/settings": {
      title: "Settings",
      subtitle: "Customize your expense tracker."
    },
  };

  const isAnalyticsPage = location.pathname === "/analytics";

  const currentPage =
    location.pathname.startsWith("/add-expense/")
      ? {
        title: "Edit Transaction",
        subtitle: "Update your transaction details."
      }
      : pageTitlesDesktop[location.pathname] || {
        title: "Expense Tracker",
        subtitle: "Manage your finances."
      };

  const pageTitlesMobile = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/add-expense": "Add Transaction",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const pageTitle =
    location.pathname.startsWith("/add-expense/")
      ? "Edit Transaction"
      : location.pathname === "/add-expense"
        ? "Add Transaction"
        : pageTitlesMobile[location.pathname] || "Expense Tracker";

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
                  {currentPage.title}
                </h3>
                <p className="text-gray-500">
                  {currentPage.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {isAnalyticsPage ? (
              <>
                {/* Date Range */}
                <DatePicker
                  selectsRange
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onChange={(dates) => {
                    const [start, end] = dates;

                    setDateRange({
                      startDate: start,
                      endDate: end,
                    });
                  }}
                  dateFormat="dd MMM yyyy"
                  customInput={
                    <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition">
                      <CalendarDays size={18} />

                      <span className="hidden md:block">
                        {dateRange.startDate?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}

                        {" - "}

                        {dateRange.endDate
                          ? dateRange.endDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                          : "Select"}
                      </span>

                      <ChevronDown size={16} className="text-gray-500" />
                    </button>
                  }
                />

                {/* Export */}
                <button onClick={() => exportCSV(filteredTransactions)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow transition">
                  <Download size={18} />
                  <span className="hidden md:block">Export CSV</span>
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => exportPDF({
                    transactions: filteredTransactions,
                    totalIncome,
                    totalExpense,
                    totalBalance,
                    dateRange,
                  })
                  } className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow transition">
                  <Download size={18} />
                  <span className="hidden md:block">Export PDF</span>
                  <ChevronDown size={16} />
                </button>
              </>
            ) : (
              <>
                <DatePicker
                  selectsRange
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onChange={(dates) => {
                    const [start, end] = dates;

                    setDateRange({
                      startDate: start,
                      endDate: end,
                    });
                  }}
                  dateFormat="dd MMM yyyy"
                  customInput={
                    <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition">
                      <CalendarDays size={18} />

                      <span className="hidden md:block">
                        {dateRange.startDate?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}

                        {" - "}

                        {dateRange.endDate
                          ? dateRange.endDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                          : "Select"}
                      </span>

                      <ChevronDown size={16} className="text-gray-500" />
                    </button>
                  }
                />
                {transactions.length > 0 && (
                  <>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete all transactions?"
                          )
                        ) {
                          clearAllTransactions();
                        }
                      }}
                      className="lg:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white lg:px-4 lg:py-2 px-2 py-1 rounded-lg transition duration-300 shadow hover:shadow-lg"
                    >
                      Clear Data
                    </button>
                    </>
                )}
                  </>
                )}

              </div>

          </div>
        </div>
    </nav>
  );
};

export default Navbar;