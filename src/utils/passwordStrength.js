export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: "",
      color: "",
      width: "0%",
    };
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (
    password.length >= 8 &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    hasSpecial
  ) {
    return {
      label: "Strong",
      color: "bg-green-500",
      width: "100%",
    };
  }

  if (
    password.length >= 8 &&
    (
      (hasLower || hasUpper) &&
      hasNumber
    )
  ) {
    return {
      label: "Medium",
      color: "bg-yellow-500",
      width: "70%",
    };
  }

  return {
    label: "Weak",
    color: "bg-red-500",
    width: "35%",
  };
};