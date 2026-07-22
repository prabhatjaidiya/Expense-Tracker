export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const updateCurrentUser = (updatedUser) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
};