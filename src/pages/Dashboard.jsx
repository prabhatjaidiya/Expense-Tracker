import React from 'react'
import Sidebar from '../components/Sidebar'
import Statcard from '../components/Statcard'
import { CiWallet } from "react-icons/ci";

const Dashboard = () => {
  return (
    <div>
      <h1 className='ml-6 text-3xl mb-4 font-semibold'>Welcome back, Prabhat! 👋</h1>
      <span className='ml-10 font-md'>here's your financial overview</span>
      <div className='flex justify-between px-10 mt-5'>
        <Statcard heading="Total Balance" amount='42,500' bg='#EEF4FF' icon={<img src='./src/assets/icons/wallet.png' className='w-14 h-14 rounded-3xl'/>} parcent="12.5"/>
        <Statcard heading="Income" amount='60,000' bg="#ECFDF3" icon={<img src='./src/assets/icons/income.png' className='w-14 h-14 rounded-3xl'/>} parcent="8.3"/>
        <Statcard heading="Expense" amount='17,500' bg="#FEF2F2" icon={<img src='./src/assets/icons/expense.png' className='w-14 h-14 rounded-3xl'/>} parcent="15.7"/>
        <Statcard heading="Savings" amount='42,500' bg='#F5F3FF' icon={<img src='./src/assets/icons/saving.png' className='w-14 h-14 rounded-3xl'/>} parcent="10.2"/>
      </div>
    </div>
  )
}

export default Dashboard
