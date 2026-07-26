import React from 'react'
import Hero from '../components/Hero'
import IncomeExpenseTrend from '../components/IncomeExpenseTrend'
import ExpenseCategoryChartAnalytics from '../components/ExpenseCategoryChartAnalytics'
import SavingsTrendCard from '../components/SavingsTrendCard'
import TopSpendingCategories from '../components/TopSpendingCagory'
import SpendingInsights from '../components/SpendingInsight'
import BudgetOverview from '../components/BudgetOverview'
import PageWrapper from "../components/PageWrapper";

const Analytics = () => {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <Hero />

        {/* Charts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <IncomeExpenseTrend />
            <ExpenseCategoryChartAnalytics />
          </div>
        </div>

        {/* Savings & Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SavingsTrendCard />
            <TopSpendingCategories />
          </div>
        </div>

        {/* Insights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingInsights />
            <BudgetOverview />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Analytics
