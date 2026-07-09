import React from 'react'
import { GrAdd } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { CiDark } from 'react-icons/ci';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center m-7'>
      <div className='flex items-center gap-4'>
        <img className='h-10 w-10 rounded-lg' src='./src/assets/icons/icon.jpeg'></img>
        <h3 className='text-2xl font-semibold'>Expense Tracker</h3>
      </div>
      <div className='flex gap-10 items-center'>
        <SearchBox />
        <Link to='/add-expense'><button className='whitespace-nowrap bg-blue-700 flex items-center gap-2 text-sm text-white py-2 rounded-xl px-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>{<GrAdd size={16}/>}Add Transection</button></Link>
        <div className='border border-black rounded-xl p-2'>{<CiDark size={20}/>}</div>
        <Link><CgProfile size={28}/></Link>
      </div>
    </div>
  )
}

export default Navbar
