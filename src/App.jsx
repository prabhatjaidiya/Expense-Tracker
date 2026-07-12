import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Link, useLocation } from "react-router-dom";
import MobileNavbar from "./components/MobileNavbar";
import Budget from "./pages/Budget";

const App = () => {

  return (
    <>

      <>
        <Navbar />

        <div className="flex">

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 mx-3 mb-3 p-4 bg-white rounded-xl shadow overflow-y-auto h-[86vh]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/add-expense/:id?" element={<AddExpense />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        <MobileNavbar />
      </>
    </>
  );
};

export default App;