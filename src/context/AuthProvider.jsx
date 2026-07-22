import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
            (user) =>
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
        );

        if (!matchedUser) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        localStorage.setItem("isLoggedIn", "true");

        setCurrentUser(matchedUser);
        setIsLoggedIn(true);

        return {
            success: true,
            user: matchedUser,
        };
    };

    const register = async (formData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(
            (user) =>
                user.email.toLowerCase() === formData.email.toLowerCase()
        );

        if (emailExists) {
            return {
                success: false,
                message: "Email already registered.",
            };
        }

        const newUser = {
            id: Date.now(),
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,

            phone: "",
            location: "",
            occupation: "",
            bio: "",
            avatar: "",
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        return {
            success: true,
            user: newUser,
        };
    };

    const verifyEmail = (email) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            return {
                success: false,
                message: "No account found with this email.",
            };
        }

        return {
            success: true,
            user,
        };
    };

    const resetPassword = (email, newPassword) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map((user) => {
            if (user.email.toLowerCase() === email.toLowerCase()) {
                return {
                    ...user,
                    password: newPassword,
                };
            }

            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Update currentUser too, if it's the same user
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (
            currentUser &&
            currentUser.email.toLowerCase() === email.toLowerCase()
        ) {
            const updatedCurrentUser = {
                ...currentUser,
                password: newPassword,
            };

            localStorage.setItem(
                "currentUser",
                JSON.stringify(updatedCurrentUser)
            );

            setCurrentUser(updatedCurrentUser);
        }

        return {
            success: true,
            message: "Password updated successfully.",
        };
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLoggedIn");

        setCurrentUser(null);
        setIsLoggedIn(false);
    };

    const updateProfile = (updatedData) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map((user) =>
            user.id === currentUser.id
                ? { ...user, ...updatedData }
                : user
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        const updatedCurrentUser = {
            ...currentUser,
            ...updatedData,
        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(updatedCurrentUser)
        );

        setCurrentUser(updatedCurrentUser);
    };

    const deleteAccount = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.filter(
            (user) => user.id !== currentUser.id
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLoggedIn");

        setCurrentUser(null);
        setIsLoggedIn(false);

        return {
            success: true,
        };
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn,

                login,
                logout,
                register,
                verifyEmail,
                resetPassword,

                setCurrentUser,
                setIsLoggedIn,

                currentUser,
                updateProfile,

                deleteAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;