import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          rounded-xl px-4 py-3 pr-12
          outline-none
          focus:ring-2 focus:ring-indigo-500
          focus:border-indigo-500 dark:focus:border-indigo-500
          transition-colors
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-gray-500 dark:text-gray-400
          hover:text-indigo-600 dark:hover:text-indigo-400
          transition-colors
        "
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;