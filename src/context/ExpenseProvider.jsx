import { useEffect, useMemo, useState } from "react";
import ExpenseContext from "./ExpenseContext";
import transactionsData from "../data/transactionsData";

const MONTHS = Array.from({ length: 6 }, (_, index) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (5 - index));

  return date.toLocaleString("en-US", {
    month: "short",
  });
});

const ExpenseProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");

    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });



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

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedTransaction }
          : item
      )
    );
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions])

  const totalExpense = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions])

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalExpense, totalIncome])

  const totalTransaction = transactions.length;


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
  }, [transactions])


  const pieData = useMemo(() => {

    const categoryMap = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categoryMap[transaction.category] = (categoryMap[transaction.category] || 0) + transaction.amount;
      }
    });

    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  }, [transactions])


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
      if (transaction.type === "expense") {
        const month = new Date(transaction.date).toLocaleString("en-US", {
          month: "short"
        })

        expenseByMonth[month] = (expenseByMonth[month] || 0) + transaction.amount;
      }
    });

    return MONTHS.map((month) => ({
      month,
      expense: expenseByMonth[month] || 0,
    }))
  }, [transactions])

  const topSpendingCategories = useMemo(() => {
    return [...pieData]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [pieData]);

  const highestExpense = useMemo(() => {
    return [...transactions]
      .filter((item) => item.type === "expense")
      .sort((a, b) => b.amount - a.amount)[0]
  }, [transactions]);

  const highestIncome = useMemo(() => {
    return [...transactions]
      .filter((item) => item.type === "income")
      .sort((a, b) => b.amount - a.amount)[0]
  }, [transactions]);

  const averageMonthlyExpense = useMemo(() => {
    const expenseMonths = new Set(
      transactions
        .filter((item) => item.type === "expense")
        .map((item) => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth()}`;
        })
    );

    return expenseMonths.size > 0
      ? totalExpense / expenseMonths.size
      : 0;
  }, [transactions, totalExpense]);

  const averageMonthlyIncome = useMemo(() => {
    const incomeMonths = new Set(
      transactions
        .filter((item) => item.type === "income")
        .map((item) => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth()}`;
        })
    );

    return incomeMonths.size > 0 ? totalIncome / incomeMonths.size : 0;
  }, [transactions, totalIncome])

  const loadDemoData = () => {
    setTransactions(transactionsData);
  };

  const clearAllTransactions = () => {
    setTransactions([]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        totalBalance,
        totalTransaction,

        highestExpense,
        highestIncome,
        averageMonthlyExpense,
        averageMonthlyIncome,

        monthlySavingsData,
        pieData,
        topSpendingCategories,
        monthlyIncomeExpenseData,
        monthlyExpenseData,

        addTransaction,
        deleteTransaction,
        updateTransaction,
        loadDemoData,
        clearAllTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;