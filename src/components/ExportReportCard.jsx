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
        <div className="w-full max-w-sm rounded-2xl mt-4 border border-gray-200 bg-white p-5 shadow-sm">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Export Report
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Download your report in your preferred format
                </p>
            </div>

            {/* PDF */}
            <button
                onClick={() => exportPDF({
                    transactions: filteredTransactions,
                    totalIncome,
                    totalExpense,
                    totalBalance,
                    dateRange,
                })
                }
                className="mt-5 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                        <FileText className="h-5 w-5 text-red-600" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Export as PDF
                        </h3>
                        <p className="text-xs text-gray-500">
                            Generate a detailed PDF report
                        </p>
                    </div>
                </div>

                <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            {/* CSV */}
            <button onClick={() => exportCSV(filteredTransactions)} className="mt-3 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="text-left">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Export as CSV
                        </h3>
                        <p className="text-xs text-gray-500">
                            Download report in CSV format
                        </p>
                    </div>
                </div>

                <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            {/* Info Box */}
            <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Info className="h-4 w-4 text-blue-600" />
                </div>

                <p className="text-xs leading-5 text-gray-600">
                    <span className="font-medium text-gray-800">Tip:</span> For best
                    results, use date range filters to generate specific reports.
                </p>
            </div>
        </div>
    );
};

export default ExportReportCard;