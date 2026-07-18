import { useCallback, useEffect, useMemo, useState } from "react";
import ExpenseContext from "./ExpenseContext";
import transactionsData from "../data/transactionsData";
import {
  UtensilsCrossed,
  ShoppingBag,
  Car,
  FileText,
  Gamepad2,
  Heart,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

const MONTHS = Array.from({ length: 12 }, (_, index) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - index));

  return date.toLocaleString("en-US", {
    month: "short",
  });
});

const categoryIcons = {
  Food: UtensilsCrossed,
  Shopping: ShoppingBag,
  Transport: Car,
  Bills: FileText,
  Entertainment: Gamepad2,
  Health: Heart,
  Education: GraduationCap,
};

const ExpenseProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");

    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(),
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (!dateRange.startDate || !dateRange.endDate) return true;

      const start = new Date(dateRange.startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999);

      return transactionDate >= start && transactionDate <= end;
    });
  }, [transactions, dateRange]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }, []);

  const updateTransaction = useCallback((id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedTransaction }
          : item
      )
    );
  }, []);

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [filteredTransactions])

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [filteredTransactions])

  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalExpense, totalIncome])

  const totalTransaction = filteredTransactions.length;


  const monthlySavingsData = useMemo(() => {

    const monthlySaving = {};

    filteredTransactions.forEach((transaction) => {
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
  }, [filteredTransactions])


  const pieData = useMemo(() => {

    const categoryMap = {};

    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categoryMap[transaction.category] = (categoryMap[transaction.category] || 0) + transaction.amount;
      }
    });

    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  }, [filteredTransactions])


  const monthlyIncomeExpenseData = useMemo(() => {

    const monthMap = {};

    filteredTransactions.forEach((transaction) => {
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
  }, [filteredTransactions]);


  const monthlyExpenseData = useMemo(() => {

    const expenseByMonth = {};

    filteredTransactions.forEach((transaction) => {
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
  }, [filteredTransactions])

  const topSpendingCategories = useMemo(() => {
    return [...pieData]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [pieData]);

  const highestExpense = useMemo(() => {
    return [...filteredTransactions]
      .filter((item) => item.type === "expense")
      .sort((a, b) => b.amount - a.amount)[0]
  }, [filteredTransactions]);

  const highestIncome = useMemo(() => {
    return [...filteredTransactions]
      .filter((item) => item.type === "income")
      .sort((a, b) => b.amount - a.amount)[0]
  }, [filteredTransactions]);

  const averageMonthlyExpense = useMemo(() => {
    const expenseMonths = new Set(
      filteredTransactions
        .filter((item) => item.type === "expense")
        .map((item) => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth()}`;
        })
    );

    return expenseMonths.size > 0
      ? totalExpense / expenseMonths.size
      : 0;
  }, [filteredTransactions, totalExpense]);

  const averageMonthlyIncome = useMemo(() => {
    const incomeMonths = new Set(
      filteredTransactions
        .filter((item) => item.type === "income")
        .map((item) => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth()}`;
        })
    );

    return incomeMonths.size > 0 ? totalIncome / incomeMonths.size : 0;
  }, [filteredTransactions, totalIncome])

  const loadDemoData = () => {
    setTransactions(transactionsData);
  };

  const clearAllTransactions = () => {
    setTransactions([]);
    setMonthlyBudget(0);
    setCategoryBudgets({
      Food: 0,
      Shopping: 0,
      Transport: 0,
      Bills: 0,
      Entertainment: 0,
      Health: 0,
      Education: 0,
    });
  };

  const [monthlyBudget, setMonthlyBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 0
  );

  const [categoryBudgets, setCategoryBudgets] = useState(
    JSON.parse(localStorage.getItem("categoryBudgets")) || {
      Food: 0,
      Shopping: 0,
      Transport: 0,
      Bills: 0,
      Entertainment: 0,
      Health: 0,
      Education: 0,
    }
  );

  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget);
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem(
      "categoryBudgets",
      JSON.stringify(categoryBudgets)
    );
  }, [categoryBudgets]);

  const updateMonthlyBudget = useCallback((amount) => {
    setMonthlyBudget(Number(amount));
  }, []);

  const resetMonthlyBudget = useCallback(() => {
    setMonthlyBudget(0);
  }, []);

  const updateCategoryBudget = useCallback((category, amount) => {
    setCategoryBudgets((prev) => ({
      ...prev,
      [category]: Number(amount),
    })), []
  });

  const currentMonthSpent = filteredTransactions.filter((transaction) => {
    const date = new Date(transaction.date);

    return (
      transaction.type === "expense" &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    );
  }).reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const budgetSummary = useMemo(() => {
    const spent = currentMonthSpent;

    const remaining = monthlyBudget - spent;

    const percentage =
      monthlyBudget > 0
        ? (spent / monthlyBudget) * 100
        : 0;

    const overBudget = spent > monthlyBudget;

    const exceededBy = overBudget
      ? spent - monthlyBudget
      : 0;

    return {
      spent,
      remaining,
      percentage,
      overBudget,
      exceededBy,
    };
  }, [monthlyBudget, totalExpense]);

  const categorySpending = useMemo(() => {
    const spending = {};

    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        spending[transaction.category] =
          (spending[transaction.category] || 0) +
          transaction.amount;
      }
    });

    return spending;
  }, [filteredTransactions]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentMonthCategorySpent = filteredTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date);

      if (
        transaction.type === "expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        acc[transaction.category] += Number(transaction.amount);
      }

      return acc;
    },
    {
      Food: 0,
      Shopping: 0,
      Transport: 0,
      Bills: 0,
      Entertainment: 0,
      Health: 0,
      Education: 0,
    }
  );

  const categoryBudgetSummary = useMemo(() => {
    return Object.entries(categoryBudgets).map(([category, budget]) => {
      const spent = currentMonthCategorySpent[category] || 0;

      const remaining = Math.max(budget - spent, 0);

      const percentage =
        budget > 0 ? Math.round((spent / budget) * 100) : 0;

      return {
        category,
        budget,
        spent,
        remaining,
        percentage,
        overBudget: spent > budget,
        icon: categoryIcons[category] || HelpCircle,
      };
    });
  }, [categoryBudgets, currentMonthCategorySpent]);

  const budgetStatus = useMemo(() => {
    const percentage =
      budgetSummary.percentage;

    if (percentage > 100)
      return {
        color: "red",
        message: "🚨 Budget exceeded",
      };

    if (percentage >= 90)
      return {
        color: "red",
        message: "❌ Budget almost exhausted",
      };

    if (percentage >= 70)
      return {
        color: "yellow",
        message: "⚠️ You've used over 70%",
      };

    return {
      color: "green",
      message: "✅ You're within budget",
    };
  }, [budgetSummary]);

  const budgetUtilization = useMemo(() => {
    return monthlyBudget > 0
      ? (totalExpense / monthlyBudget) * 100
      : 0;
  }, [monthlyBudget, totalExpense]);

  const highestSpendingCategory = useMemo(() => {
    if (topSpendingCategories.length === 0)
      return null;

    return topSpendingCategories[0];
  }, [topSpendingCategories]);

  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("budget")) || 0;
  });

  const saveBudget = (amount) => {
    setBudget(Number(amount));
    localStorage.setItem("budget", amount);
  };

  const resetBudget = () => {
    setBudget(0);
    localStorage.removeItem("budget");
  };

  const budgetAlerts = useMemo(() => {
    return categoryBudgetSummary
      .filter(
        (item) =>
          item.budget > 0 &&
          item.spent > 0 &&
          item.percentage >= 70
      )
      .sort((a, b) => b.percentage - a.percentage);
  }, [categoryBudgetSummary]);

  const monthlySummary = useMemo(() => {
    const summary = {
      currentIncome: 0,
      previousIncome: 0,
      currentExpense: 0,
      previousExpense: 0,
      currentTransactions: 0,
      previousTransactions: 0,
    };

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousDate = new Date(currentYear, currentMonth - 1, 1);
    const previousMonth = previousDate.getMonth();
    const previousYear = previousDate.getFullYear();

    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      const isCurrent =
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear;

      const isPrevious =
        date.getMonth() === previousMonth &&
        date.getFullYear() === previousYear;

      if (isCurrent) {
        summary.currentTransactions++;

        if (transaction.type === "income") {
          summary.currentIncome += Number(transaction.amount);
        } else {
          summary.currentExpense += Number(transaction.amount);
        }
      }

      if (isPrevious) {
        summary.previousTransactions++;

        if (transaction.type === "income") {
          summary.previousIncome += Number(transaction.amount);
        } else {
          summary.previousExpense += Number(transaction.amount);
        }
      }
    });

    return {
      ...summary,
      currentBalance: summary.currentIncome - summary.currentExpense,
      previousBalance: summary.previousIncome - summary.previousExpense,
    };
  }, [filteredTransactions]);

  const spendingInsights = useMemo(() => {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousDate = new Date(currentYear, currentMonth - 1, 1);
    const previousMonth = previousDate.getMonth();
    const previousYear = previousDate.getFullYear();

    const currentTransactions = filteredTransactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear &&
        t.type === "expense"
      );
    });

    const previousTransactions = filteredTransactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === previousMonth &&
        d.getFullYear() === previousYear &&
        t.type === "expense"
      );
    });

    // Category totals
    const currentCategory = {};
    const previousCategory = {};

    currentTransactions.forEach((t) => {
      currentCategory[t.category] =
        (currentCategory[t.category] || 0) + Number(t.amount);
    });

    previousTransactions.forEach((t) => {
      previousCategory[t.category] =
        (previousCategory[t.category] || 0) + Number(t.amount);
    });

    // Highest increase
    let alert = null;
    let maxIncrease = 0;

    Object.keys(currentCategory).forEach((category) => {
      const current = currentCategory[category] || 0;
      const previous = previousCategory[category] || 0;

      if (previous > 0) {
        const increase = ((current - previous) / previous) * 100;

        if (increase > maxIncrease) {
          maxIncrease = increase;

          alert = {
            category,
            percentage: Math.round(increase),
          };
        }
      }
    });

    // Highest spending category
    const highestCategory = Object.entries(currentCategory).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const savingOpportunity = highestCategory
      ? {
        category: highestCategory[0],
        amount: Math.round(highestCategory[1] * 0.15), // Suggest saving 15%
      }
      : null;

    // Savings comparison
    const getSavings = (month, year) => {
      let income = 0;
      let expense = 0;

      filteredTransactions.forEach((t) => {
        const d = new Date(t.date);

        if (d.getMonth() === month && d.getFullYear() === year) {
          if (t.type === "income") income += Number(t.amount);
          else expense += Number(t.amount);
        }
      });

      return income - expense;
    };

    const currentSavings = getSavings(currentMonth, currentYear);
    const previousSavings = getSavings(previousMonth, previousYear);

    let savingsGrowth = 0;

    if (previousSavings > 0) {
      savingsGrowth =
        ((currentSavings - previousSavings) / previousSavings) * 100;
    }

    return {
      alert,
      savingOpportunity,
      savingsGrowth: Math.round(savingsGrowth),
    };
  }, [transactions]);

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        filteredTransactions,
        dateRange,
        setDateRange,
        totalIncome,
        totalExpense,
        totalBalance,
        totalTransaction,

        monthlySummary,

        budget,
        currentMonthSpent,
        budgetSummary,
        monthlyBudget,
        setMonthlyBudget,
        updateMonthlyBudget,
        resetMonthlyBudget,

        budgetUtilization,
        highestSpendingCategory,
        budgetAlerts,
        spendingInsights,

        categoryBudgetSummary,
        setCategoryBudgets,
        updateCategoryBudget,

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