import React, { useContext, useState } from "react";
import { AlertTriangle, LogOut, Trash2 } from "lucide-react";
import AuthContext from "../context/AuthContext";
import ExpenseContext from "../context/ExpenseContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const DangerZoneCard = () => {
    const { logout, deleteAccount } = useContext(AuthContext);
    const { clearAllTransactions } = useContext(ExpenseContext);

    const navigate = useNavigate();

    const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const handleDeleteData = () => {
        setShowDeleteDataModal(true);
    };

    const confirmDeleteData = () => {
        clearAllTransactions();

        toast.success("Data deleted successfully.");

        setShowDeleteDataModal(false);
    };

    const handleDeleteAccount = () => {
        setShowDeleteAccountModal(true);
    };

    const confirmDeleteAccount = () => {
        clearAllTransactions();
        deleteAccount();

        toast.success("Account deleted successfully.");

        setShowDeleteAccountModal(false);

        navigate("/login");
    };

    const handleLogout = () => {
        logout();

        toast.success("Logged out successfully.");
        navigate("/login");
    };

    return (
        <>
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow transition-colors">

                {/* Header */}
                <div className="flex items-center gap-3 border-b border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-5 sm:p-6">

                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />

                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-400">
                            Danger Zone
                        </h2>

                        <p className="text-xs sm:text-sm text-red-600 dark:text-red-300">
                            These actions affect your account permanently.
                        </p>
                    </div>

                </div>

                <div className="space-y-6 p-5 sm:p-6">

                    {/* Logout */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Logout
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Sign out of your account.
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>

                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    {/* Delete Data */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h3 className="font-semibold text-orange-600 dark:text-orange-400">
                                Delete Data
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Permanently delete all transactions.
                            </p>
                        </div>

                        <button
                            onClick={handleDeleteData}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600 transition"
                        >
                            <Trash2 size={18} />
                            Delete Data
                        </button>

                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    {/* Delete Account */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h3 className="font-semibold text-red-600 dark:text-red-400">
                                Delete Account
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Permanently delete your account and profile.
                            </p>
                        </div>

                        <button
                            onClick={handleDeleteAccount}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700 transition"
                        >
                            <Trash2 size={18} />
                            Delete Account
                        </button>

                    </div>

                </div>

            </div>
            <ConfirmModal
                isOpen={showDeleteDataModal}
                onClose={() => setShowDeleteDataModal(false)}
                onConfirm={confirmDeleteData}
                title="Delete All Data?"
                message="This will permanently delete all your transactions. This action cannot be undone."
            />
            <ConfirmModal
                isOpen={showDeleteAccountModal}
                onClose={() => setShowDeleteAccountModal(false)}
                onConfirm={confirmDeleteAccount}
                title="Delete Account?"
                message="This will permanently delete your account, profile, and all transactions. This action cannot be undone."
            />
        </>
    );
};

export default DangerZoneCard;