import React, { useContext } from 'react'
import { AlertTriangle, LogOut, Trash2, DatabaseZap } from "lucide-react";
import AuthContext from '../context/AuthContext';
import ExpenseContext from '../context/ExpenseContext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const DangerZoneCard = () => {
    const { logout, deleteAccount } = useContext(AuthContext)
    const { clearAllTransactions } = useContext(ExpenseContext)

    const navigate = useNavigate();

    const handleDeleteData = () => {
        const confirmed = window.confirm(
            "Delete all transactions? This action cannot be undone."
        )

        if (!confirmed) return;

        clearAllTransactions();

        toast.success("Data deleted successfully.")
    }

    const handleDeleteAccount = () => {
        const confirmed = window.confirm(
            "Delete your account permanently? This will remove your profile and all your data."
        );

        if (!confirmed) return;

        clearAllTransactions();
        deleteAccount();

        toast.success("Account deleted successfully.");

        navigate("/login");
    };

    const handleLogout = () => {
        logout();

        toast.success("Logged out successfully.");

        navigate("/login");
    };

    return (
        <div className="bg-white rounded-3xl shadow mt-8 overflow-hidden">

            {/* Header */}

            <div className="border-b border-red-100 bg-red-50 p-5 sm:p-6 flex items-center gap-3">

                <AlertTriangle className="text-red-600 w-6 h-6" />

                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-red-700">
                        Danger Zone
                    </h2>

                    <p className="text-xs sm:text-sm text-red-500">
                        These actions affect your account permanently.
                    </p>
                </div>

            </div>

            <div className="p-5 sm:p-6 space-y-6">

                {/* Logout */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <h3 className="font-semibold">
                            Logout
                        </h3>

                        <p className="text-sm text-gray-500">
                            Sign out of your account.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

                <hr />

                {/* Delete Data */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <h3 className="font-semibold text-orange-600">
                            Delete Data
                        </h3>

                        <p className="text-sm text-gray-500">
                            Permanently delete all transactions.
                        </p>
                    </div>

                    <button
                        onClick={handleDeleteData}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
                    >
                        <Trash2 size={18} />
                        Delete Data
                    </button>

                </div>

                <hr />

                {/* Delete Account */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <h3 className="font-semibold text-red-600">
                            Delete Account
                        </h3>

                        <p className="text-sm text-gray-500">
                            Permanently delete your account and profile.
                        </p>
                    </div>

                    <button
                        onClick={handleDeleteAccount}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
                    >
                        <Trash2 size={18} />
                        Delete Account
                    </button>

                </div>

            </div>

        </div>
    )
}

export default DangerZoneCard
