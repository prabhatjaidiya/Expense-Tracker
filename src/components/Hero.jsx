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
    <div className="lg:px-5 px-1 lg:pb-6 pb-3">

      {/* Cards */}
      <div className="lg:mt-6 grid grid-cols-2 gap-6 lg:gap-6 md:grid-cols-4 xl:grid-cols-4">
        <Statcard
          heading="Balance"
          amount={balance}
          bg="#EEF4FF"
          icon={
            <div className="flex h-6 w-6 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-blue-100">
              <FaWallet className="text-md lg:text-2xl text-blue-600" />
            </div>
          }
        />

        <Statcard
          heading="Income"
          amount={income}
          bg="#ECFDF3"
          icon={
            <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-green-100">
              <MdOutlineAttachMoney className="text-md lg:text-2xl text-green-600" />
            </div>
          }
        />

        <Statcard
          heading="Expense"
          amount={expense}
          bg="#FEF2F2"
          icon={
            <div className="flex h-6 w-6 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-red-100">
              <IoTrendingDown className="text-md lg:text-2xl text-red-600" />
            </div>
          }
        />

        <Statcard
          heading="Transactions"
          amount={totalTransaction}
          bg="#F5F3FF"
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