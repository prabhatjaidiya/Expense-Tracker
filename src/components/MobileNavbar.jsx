import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrTransaction, GrAdd } from "react-icons/gr";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FileBarChart } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MobileNavbar = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-lg z-50">
      <div className="flex justify-around items-center h-16">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <RiDashboardHorizontalLine size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <MdOutlineAnalytics size={22} />
          Analytics
        </NavLink>

        {/* Floating Add Button */}
        <NavLink to="/add-expense">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl -mt-8">
            <GrAdd size={22} />
          </div>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <FileBarChart size={22} />
          Reports
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <img
            src={
              currentUser?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                currentUser?.fullName || "User"
              )}`
            }
            alt={currentUser?.fullName || "User Avatar"}
            className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-lg"
          />
          Profile
        </NavLink>

      </div>
    </div>
  );
};

export default MobileNavbar;