import React, { useContext } from "react";
import Statcard from "./Statcard";
import ExpenseContext from "../context/ExpenseContext";
import { FaWallet } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoTrendingDown } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi2";

const Hero = () => {
  const {
    totalBalance,
    totalIncome,
    totalExpense,
    totalTransaction,
    monthlySummary,
  } = useContext(ExpenseContext);


  const balance = `₹ ${totalBalance.toLocaleString("en-IN")}`;
  const income = `₹ ${totalIncome.toLocaleString("en-IN")}`;
  const expense = `₹ ${totalExpense.toLocaleString("en-IN")}`;

  const calculatePercentage = (current, previous) => {
    if (previous === 0) return 0;

    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const balancePercentage = calculatePercentage(
    monthlySummary.currentBalance,
    monthlySummary.previousBalance
  );

  const incomePercentage = calculatePercentage(
    monthlySummary.currentIncome,
    monthlySummary.previousIncome
  );

  const expensePercentage = calculatePercentage(
    monthlySummary.currentExpense,
    monthlySummary.previousExpense
  );

  const transectionPercentage = calculatePercentage(
    monthlySummary.currentTransactions,
    monthlySummary.previousTransactions

  )

  return (
    <div className="lg:px-5 px-1 lg:pb-6 pb-3">

      {/* Cards */}
      <div className="lg:mt-6 grid grid-cols-2 gap-6 lg:gap-6 md:grid-cols-4 xl:grid-cols-4">
        <Statcard
          heading="Balance"
          amount={balance}
          percentage={balancePercentage}
          isPositive={monthlySummary.currentBalance >= monthlySummary.previousBalance}
          icon={
            <div className="flex h-6 w-6 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-blue-100">
              <FaWallet className="text-md lg:text-2xl text-blue-600" />
            </div>
          }
        />

        <Statcard
          heading="Income"
          amount={income}
          percentage={incomePercentage}
          isPositive={monthlySummary.currentIncome >= monthlySummary.previousIncome}
          icon={
            <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-green-100">
              <MdOutlineAttachMoney className="text-md lg:text-2xl text-green-600" />
            </div>
          }
        />

        <Statcard
          heading="Expense"
          amount={expense}
          percentage={expensePercentage}
          isPositive={monthlySummary.currentExpense >= monthlySummary.previousExpense}
          icon={
            <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-red-100">
              <IoTrendingDown className="text-md lg:text-2xl text-red-600" />
            </div>
          }
        />

        <Statcard
          heading="Transactions"
          amount={totalTransaction}
          percentage={transectionPercentage}
          isPositive={monthlySummary.currentTransactions >= monthlySummary.previousTransactions}
          icon={
            <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-indigo-100">
              <HiOutlineReceiptRefund className="text-md lg:text-2xl text-indigo-600" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Hero;