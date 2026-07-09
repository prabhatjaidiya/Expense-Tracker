import { useEffect, useMemo, useState } from "react";
import ExpenseContext from "./ExpenseContext";
import transactionsData from "../data/transactions";

const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ];

const ExpenseProvider = ({ children }) => {
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  const storedTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );

  setTransactions(
    storedTransactions?.length
      ? storedTransactions
      : transactionsData
  );
}, []);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );
  };

  const totalIncome = useMemo(() => {
    return transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
  },[transactions])

  const totalExpense = useMemo(() => {
    return transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  },[transactions])

  const balance = useMemo(() => {
    return totalIncome - totalExpense;
  },[ totalExpense, totalIncome ]) 


    const monthlySavingsData = useMemo(() => {

      const monthlySaving = {};
  
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("en-US", {
        month: "short",
      });
  
      if (!monthlySaving[month]) {
        monthlySaving[month] = {
          month,
          income: 0,
          expense: 0,
        };
      }
  
      if (transaction.type === "income") {
        monthlySaving[month].income += transaction.amount;
      } else {
        monthlySaving[month].expense += transaction.amount;
      }
    });

      return MONTHS.map((month) => ({
      month,
      savings:
        (monthlySaving[month]?.income || 0) -
        (monthlySaving[month]?.expense || 0),
    }));
    },[transactions])

    
    const pieData = useMemo(() => {
    
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if(transaction.type === "expense"){
          categoryMap[transaction.category] = (categoryMap[transaction.category] || 0) + transaction.amount;
        }
      });

      return Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
      }));
    },[transactions])

      
  const monthlyIncomeExpenseData = useMemo(() => {

  const monthMap = {};

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString("en-US", {
      month: "short",
    });

    if (!monthMap[month]) {
      monthMap[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      monthMap[month].income += transaction.amount;
    } else {
      monthMap[month].expense += transaction.amount;
    }
  });

  return MONTHS.map((month) => ({
    month,
    Income: monthMap[month]?.income || 0,
    Expense: monthMap[month]?.expense || 0,
  }));
}, [transactions]);


  const monthlyExpenseData = useMemo(() => {
  
    const expenseByMonth = {};

    transactions.forEach((transaction) => {
      if(transaction.type === "expense"){
        const month = new Date(transaction.date).toLocaleString("en-US",{
          month: "short"
        })

        expenseByMonth[month] = (expenseByMonth[month] || 0) + transaction.amount;
      }
    });
  
    return MONTHS.map((month) => ({
    month,
    expense: expenseByMonth[month],
  }))
  },[transactions])

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        totalIncome,
        totalExpense,
        balance,
        monthlySavingsData,
        pieData,
        monthlyIncomeExpenseData,
        monthlyExpenseData,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;