import React from 'react'
import { GoArrowUpRight } from "react-icons/go";

const Statcard = ({heading,amount,icon,parcent,bg}) => {
  return (
    <>
    <div style={{backgroundColor:bg}} className='p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
      <div className='flex gap-10 mb-2 px-4'>
        <div>
        <h1 className='text-lg'>{heading}</h1>
        <h1 className='text-2xl my-1'>₹{amount}</h1>
        </div>
        {icon}
      </div>
      <div className='flex items-center'>{<GoArrowUpRight size={18} className='text-green-700'/>}<span className='text-green-700 mr-1'>{parcent}%</span><span>from last month</span></div>
    </div>
    </>
  )
}

export default Statcard
