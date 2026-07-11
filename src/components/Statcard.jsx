import React from 'react'
import { GoArrowUpRight } from "react-icons/go";

const Statcard = ({heading,amount,icon,parcent,bg}) => {
  return (
    <>
    <div style={{backgroundColor:bg}} className='p-5 w-min rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>
      <div className='flex gap-8 mb-2'>
        <div>
        <h1 className='text-lg whitespace-nowrap'>{heading}</h1>
        <h1 className='text-2xl my-1 whitespace-nowrap w-full'>{amount}</h1>
        </div>
        {icon}
      </div>
    </div>
    </>
  )
}

export default Statcard
