import React, { useContext } from 'react'
import Statcard from './Statcard'
import ExpenseContext from '../context/ExpenseContext'

const Hero = () => {
    const { balance, totalIncome, totalExpense } = useContext(ExpenseContext)
  return (
    <>
    <h1 className='ml-6 text-3xl mb-4 font-semibold'>Welcome back, Prabhat! 👋</h1>
      <span className='ml-10 font-md'>here's your financial overview</span>
      <div className='flex justify-between px-10 mt-5'>
        <Statcard heading="Total Balance" amount={balance} bg='#EEF4FF' icon={<img src='./src/assets/icons/wallet.png' className='w-14 h-14 rounded-3xl'/>} parcent="12.5"/>
        <Statcard heading="Income" amount={totalIncome} bg="#ECFDF3" icon={<img src='./src/assets/icons/income.png' className='w-14 h-14 rounded-3xl'/>} parcent="8.3"/>
        <Statcard heading="Expense" amount={totalExpense} bg="#FEF2F2" icon={<img src='./src/assets/icons/expense.png' className='w-14 h-14 rounded-3xl'/>} parcent="15.7"/>
        <Statcard heading="Savings" amount={balance} bg='#F5F3FF' icon={<img src='./src/assets/icons/saving.png' className='w-14 h-14 rounded-3xl'/>} parcent="10.2"/>
      </div>
    </>
  )
}

export default Hero
