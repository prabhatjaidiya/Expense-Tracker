import { GrAdd } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { CiDark } from 'react-icons/ci';
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import logo from "../assets/icons/icon.jpeg";


const Navbar = () => {
  const {
    loadDemoData,
    clearAllTransactions,
  } = useContext(ExpenseContext);

  return (
    <div className='flex justify-between items-center m-7'>
      <div className='flex items-center gap-4'>
        <img className='h-10 w-10 rounded-lg' src={logo} alt="Logo" />
        <h3 className='text-2xl font-semibold'>Expense Tracker</h3>
      </div>
      <div className='flex gap-10 items-center'>
        <button
          onClick={loadDemoData}
          className='whitespace-nowrap bg-blue-700 flex items-center gap-2 text-sm text-white py-2 rounded-xl px-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'
        >
          Load Demo Data
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete all transactions?")) {
              clearAllTransactions();
            }
          }}
          className='whitespace-nowrap bg-red-700 flex items-center gap-2 text-sm text-white py-2 rounded-xl px-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'
        >
          Clear All Data
        </button>
        <Link to='/add-expense'><button className='whitespace-nowrap bg-blue-700 flex items-center gap-2 text-sm text-white py-2 rounded-xl px-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer'>{<GrAdd size={16} />}Add Transaction</button></Link>
        <button className='border border-black rounded-xl p-2  hover:bg-gray-100 transition'>{<CiDark size={20} />}</button>
        <Link><CgProfile size={28} className="cursor-pointer hover:text-blue-600 transition" /></Link>
      </div>
    </div>
  )
}

export default Navbar
