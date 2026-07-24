import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { getPasswordStrength } from "../utils/passwordStrength";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import AuthContext from "../context/AuthContext";

const ForgotPassword = () => {
  const { verifyEmail, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = verifyEmail(email);

    if (result.success) {
      toast.success("Email verified!");
      setEmailVerified(true);
    } else {
      toast.error(result.message);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("New password is required.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const result = resetPassword(email, newPassword);

    if (result.success) {
      toast.success(result.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password"
        subtitle="Enter your email to reset password."
      >
        {emailVerified ? (
          <form onSubmit={handleResetPassword} className="space-y-5">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>

              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              {newPassword && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>

                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                    Password Strength:
                    <span className="font-semibold ml-1">
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>

              <PasswordInput
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200"
            >
              Reset Password
            </button>

          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>

            <p className="text-center text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;