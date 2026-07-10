import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddExpense from './pages/AddExpense'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <>
    <Navbar />
    <div className='flex h-full'>
      <Sidebar />
      <div className='m-3 w-full pl-3'>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/transactions' element={<Transactions />} />
          <Route path="/add-expense/:id?" element={<AddExpense />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
