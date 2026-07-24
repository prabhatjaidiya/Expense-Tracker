import { NavLink } from "react-router-dom";
import {
  RiDashboardHorizontalLine,
} from "react-icons/ri";
import { GrTransaction, GrAdd } from "react-icons/gr";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { PiWalletBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FileBarChart } from "lucide-react";
import { getCurrentUser } from "../utils/auth";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext)

  const menus = [
    {
      name: "Dashboard",
      icon: <RiDashboardHorizontalLine size={20} />,
      path: "/",
    },
    {
      name: "Transactions",
      icon: <GrTransaction size={18} />,
      path: "/transactions",
    },
    {
      name: "Add Transaction",
      icon: <GrAdd size={18} />,
      path: "/add-expense",
    }, {
      name: "Analytics",
      icon: <HiOutlinePresentationChartLine size={22} />,
      path: "/analytics",
    },
    {
      name: "Budget",
      icon: <PiWalletBold size={20} />,
      path: "/budget",
    }, {
      name: "Reports",
      icon: <FileBarChart size={22} />,
      path: "/reports",
    },
  ];

  return (
    <aside className="w-64 h-[86vh] shadow border-gray-200 dark:border-gray-800 dark:shadow-gray rounded-xl sticky top-16 bg-white text-black dark:bg-gray-900 dark:text-white border-r flex flex-col justify-between">

      {/* Logo */}
      <div>

        {/* Menu */}

        <div className="mt-6 px-3 space-y-2">
          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom */}

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <NavLink to="/profile">
          <div className="flex items-center gap-3 mt-5 p-3 rounded-xl dark:hover:bg-gray-800 hover:bg-gray-100 cursor-pointer transition">
            <img
              src={
                currentUser?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  currentUser?.fullName || "User"
                )}`
              }
              alt={currentUser?.fullName || "User Avatar"}
              className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-lg"
            />
            <div>
              <h3 className="font-semibold">
                {currentUser?.fullName}
              </h3>

              <p className="text-xs text-gray-500">
                View Profile
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;