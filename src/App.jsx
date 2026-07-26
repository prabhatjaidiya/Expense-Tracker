import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MobileNavbar from "./components/MobileNavbar";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
  ];

  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-100 text-gray-900 lg:h-screen dark:bg-gray-950 dark:text-gray-100">
      {!isAuthPage && <Navbar />}

      <div className="flex">
        {!isAuthPage && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        <main
          className={
            isAuthPage
              ? "w-full min-h-screen"
              : "flex-1 mx-3 mb-3 p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow overflow-y-auto hide-scrollbar lg:h-[calc(100vh-14vh)]"
          }
        >
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* App */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-expense/:id?"
              element={
                <ProtectedRoute>
                  <AddExpense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <Budget />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={localStorage.getItem("isLoggedIn") ? "/" : "/login"}
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>

      {!isAuthPage && <MobileNavbar />}
    </div>
  );
};

export default App;