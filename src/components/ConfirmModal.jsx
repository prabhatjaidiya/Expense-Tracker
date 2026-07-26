import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone."
}) => {

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                            <Trash2
                                size={22}
                                className="text-red-600 dark:text-red-400"
                            />
                        </div>

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400">
                    {message}
                </p>


                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>


                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </motion.div>

        </motion.div>
    );
};

export default ConfirmModal;