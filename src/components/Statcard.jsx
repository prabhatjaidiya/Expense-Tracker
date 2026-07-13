import React from 'react'
import { GoArrowUpRight } from "react-icons/go";

const Statcard = ({heading,amount,icon,bg}) => {
  return (
    <>
    <div style={{backgroundColor:bg}} className='p-3 lg:p-5 w-min rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
      <div className='flex gap-3 lg:gap-6 mb-4 items-center'>
        <div>
        <h3 className="text-sm lg:text-lg font-semibold text-gray-800">{heading}</h3>
        <h2 className="text-sm lg:text-xl font-bold text-gray-900 whitespace-nowrap">{amount}</h2>
        </div>
        {icon}
      </div>
    </div>
    </>
  )
}

export default Statcard
