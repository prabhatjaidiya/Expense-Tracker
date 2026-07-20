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
import logo from "../assets/icons/icon.jpeg";
import { FileBarChart } from "lucide-react";

const Sidebar = () => {
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
    },{
      name: "Analytics",
      icon: <HiOutlinePresentationChartLine size={22} />,
      path: "/analytics",
    },
    {
      name: "Budget",
      icon: <PiWalletBold size={20} />,
      path: "/budget",
    },{
      name: "Reports",
      icon: <FileBarChart size={22} />,
      path: "/report",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline size={20} />,
      path: "/settings",
    },
    
  ];

  return (
    <aside className="w-64 h-[86vh] shadow rounded-xl sticky top-16 bg-white border-r flex flex-col justify-between">

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
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
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

      <div className="p-4 border-t">

        <button className="w-full flex items-center justify-between rounded-xl border p-3 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <CiDark size={22} />
            <span>Dark Mode</span>
          </div>

          <input
            type="checkbox"
            className="accent-blue-600"
          />
        </button>

        <div className="flex items-center gap-3 mt-5 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition">
          <CgProfile
            size={42}
            className="text-gray-500"
          />

          <div>
            <h3 className="font-semibold">
              Prabhat
            </h3>

            <p className="text-xs text-gray-500">
              View Profile
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;