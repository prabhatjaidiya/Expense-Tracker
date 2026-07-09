import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className='w-[260px] p-3 shadow-xl rounded-xl m-3 flex flex-col justify-between'>
      <div>
        <Link to="/" className='text-md flex gap-3 h-12 px-6 items-center rounded-xl mx-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
          {<RiDashboardHorizontalLine size={20}/>}
          Dashboard
        </Link>
        <Link to='/transactions' className='text-md flex gap-3 mt-6 h-12 px-6 items-center rounded-xl mx-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
          {<GrTransaction size={20}/>}
          Transections
        </Link>
        <Link to='/add-expense' className='text-md flex gap-3 mt-6 h-12 px-6 items-center rounded-xl mx-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
          {<GrAdd size={20}/>}
          Add Expense
        </Link>
        <Link className='text-md flex gap-3 mt-6 h-12 px-6 items-center rounded-xl mx-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
          {<MdOutlineAnalytics size={20}/>}
          Analytics
        </Link>
        <Link className='text-md flex gap-3 mt-6 h-12 px-6 items-center rounded-xl mx-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
          {<IoSettingsOutline size={20}/>}
          Settings
        </Link>
      </div>  
    </div>
  )
}

export default Sidebar
