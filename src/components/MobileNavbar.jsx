import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrTransaction, GrAdd } from "react-icons/gr";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-lg z-50">
      <div className="flex justify-around items-center h-16">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <RiDashboardHorizontalLine size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <GrTransaction size={20} />
          Transactions
        </NavLink>

        {/* Floating Add Button */}
        <NavLink to="/add-expense">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl -mt-8">
            <GrAdd size={22} />
          </div>
        </NavLink>

        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <MdOutlineAnalytics size={22} />
          Budgets
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <IoSettingsOutline size={22} />
          Settings
        </NavLink>

      </div>
    </div>
  );
};

export default MobileNavbar;