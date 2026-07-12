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
  } = useContext(ExpenseContext);

  const balance = `₹ ${totalBalance.toLocaleString("en-IN")}`;
  const income = `₹ ${totalIncome.toLocaleString("en-IN")}`;
  const expense = `₹ ${totalExpense.toLocaleString("en-IN")}`;

  return (
    <div className="px-5 pb-6">

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Statcard
          heading="Balance"
          amount={balance}
          bg="#EEF4FF"
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <FaWallet className="text-2xl text-blue-600" />
            </div>
          }
        />

        <Statcard
          heading="Income"
          amount={income}
          bg="#ECFDF3"
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <MdOutlineAttachMoney className="text-2xl text-green-600" />
            </div>
          }
        />

        <Statcard
          heading="Expense"
          amount={expense}
          bg="#FEF2F2"
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <IoTrendingDown className="text-2xl text-red-600" />
            </div>
          }
        />

        <Statcard
          heading="Transactions"
          amount={totalTransaction}
          bg="#F5F3FF"
          icon={
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <HiOutlineReceiptRefund className="text-2xl text-indigo-600" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Hero;