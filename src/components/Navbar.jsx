import { GrAdd } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CiDark } from "react-icons/ci";
import { useContext, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import logo from "../assets/logo.png";
import { Link, Links, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import ExportDropdown from "./ExportDropdown";
import AuthContext from "../context/AuthContext";


const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const {
    loadDemoData,
    transactions,
    dateRange,
    setDateRange,
    filteredTransactions,
    totalIncome,
    totalExpense,
    totalBalance } =
    useContext(ExpenseContext);


  const location = useLocation();
  const navigate = useNavigate();

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
      title: "Report",
      subtitle: "Export and review your financial reports."
    },
    "/settings": {
      title: "Settings",
      subtitle: "Customize your expense tracker."
    },
  };

  const isReportPage = location.pathname === "/reports";

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
    "/reports": "Report"
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
            <NavLink to="/">
              {/* Logo */}
              <img src={logo} className="h-12 w-12 rounded-xl" />

              {/* Logo text (desktop only) */}
              <h2 className="hidden lg:block font-semibold">
                Expense Tracker
              </h2>
            </NavLink>

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

            {isReportPage ? (
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
                {/* Export */}
                <ExportDropdown />
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
                { isReportPage && <ExportDropdown />}
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;