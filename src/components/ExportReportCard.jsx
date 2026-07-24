import { FileText, FileSpreadsheet, ChevronRight, Info } from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";
import { useContext } from "react";
import exportCSV from "../utils/exportCSV";
import exportPDF from "../utils/exportPDF";

const ExportReportCard = () => {
    const { filteredTransactions, transactions,
        dateRange,
        setDateRange,
        totalIncome,
        totalExpense,
        totalBalance } = useContext(ExpenseContext);
    return (
        <div className="w-full max-w-sm rounded-2xl mt-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm transition-colors">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Export Report
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Download your report in your preferred format
                </p>
            </div>

            {/* PDF */}
            <button
                onClick={() => exportPDF({
                    filteredTransactions,
                    totalIncome,
                    totalExpense,
                    totalBalance
                })
                }
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 transition hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                        <FileText className="h-5 w-5 text-red-600" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Export as PDF
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Generate a detailed PDF report
                        </p>
                    </div>
                </div>

                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500"/>
            </button>

            {/* CSV */}
            <button onClick={() => exportCSV(filteredTransactions)} className="mt-3 flex w-full items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 transition hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Export as CSV
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Download report in CSV format
                        </p>
                    </div>
                </div>

                <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            {/* Info Box */}
            <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800">
                    <Info className="h-4 w-4 text-blue-600" />
                </div>

                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-800 dark:text-white">Tip:</span> For best
                    results, use date range filters to generate specific reports.
                </p>
            </div>
        </div>
    );
};

export default ExportReportCard;