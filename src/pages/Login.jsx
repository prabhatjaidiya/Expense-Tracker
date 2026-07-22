import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import PasswordInput from "../components/PasswordInput";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("isLoggedIn")) {
    return <Navigate to="/" replace />;
  }
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back 👋"
        subtitle="Sign in to continue managing your expenses."
      >
        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!validate()) return;

            setLoading(true);

            setTimeout(() => {
              const result = login(email, password);

              if (result.success) {
                toast.success(`Welcome back, ${result.user.fullName}!`);
                navigate("/");
              } else {
                toast.error(result.message);
              }

              setLoading(false);
            }, 1500);
          }}
        >

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium"
            >
              Register
            </Link>
          </p>

        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;