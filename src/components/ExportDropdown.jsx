import { useState, useRef, useEffect, useContext } from "react";
import {
    Download,
    ChevronDown,
    FileText,
    FileSpreadsheet,
} from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";
import exportCSV from "../utils/exportCSV";
import exportPDF from "../utils/exportPDF";

const ExportDropdown = ({ onPDF, onCSV }) => {
    const { filteredTransactions, totalIncome, totalExpense, totalBalance, dateRange } = useContext(ExpenseContext)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
            >
                <Download size={16} />
                <span className="hidden md:block">
                    Export        
                </span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100 z-50">
                    <button
                        onClick={() => exportPDF({
                            transactions: filteredTransactions,
                            totalIncome,
                            totalExpense,
                            totalBalance,
                            dateRange,
                        })
                        }
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                            <FileText className="h-4 w-4 text-red-600" />
                        </div>

                        <span>Export as PDF</span>
                    </button>

                    <div className="border-t border-gray-100" />

                    <button
                        onClick={() => exportCSV(filteredTransactions)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                            <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        </div>

                        <span>Export as CSV</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportDropdown;