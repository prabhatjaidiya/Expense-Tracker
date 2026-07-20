import React from 'react'
import Hero from '../components/Hero'
import IncomeExpenseTrend from '../components/IncomeExpenseTrend'
import ExpenseCategoryChartAnalytics from '../components/ExpenseCategoryChartAnalytics'
import SavingsTrendCard from '../components/SavingsTrendCard'
import TopSpendingCategories from '../components/TopSpendingCagory'
import SpendingInsights from '../components/SpendingInsight'
import BudgetOverview from '../components/BudgetOverview'

const Analytics = () => {
  return (
    <div>
      <Hero />
      <div className='max-w-7xl lg:flex lg:gap-4 mx-auto px-4 sm:px-6 lg:px-4'>
        <IncomeExpenseTrend />
        <ExpenseCategoryChartAnalytics />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SavingsTrendCard />
          <TopSpendingCategories />
        </div>
        <div className="flex flex-wrap">
          <SpendingInsights />
          <BudgetOverview />
        </div>
      </div>
    </div>
  )
}

export default Analytics
