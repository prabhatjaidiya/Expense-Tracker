import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";

const BudgetForm = () => {
    const { monthlyBudget, setMonthlyBudget } = useContext(ExpenseContext);
    
    const [budgetInput, setBudgetInput] = useState(monthlyBudget);

    useEffect(() => {
        setBudgetInput(monthlyBudget);
    }, [monthlyBudget]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const amount = Number(budgetInput);

        if (!amount || amount < 0) return;

        setMonthlyBudget(amount);
    };

    const handleReset = () => {
        if (!window.confirm("Reset monthly budget?")) return;

        setMonthlyBudget(0);
        setBudgetInput("");
    };

    return (
        <div className="bg-white rounded-xl mt-2 h-min lg:w-1/2 shadow-md border p-6">
            <h2 className="text-xl font-semibold mb-5 lg:ml-12">
                Monthly Budget
            </h2>
            <div className="flex justify-evenly flex-wrap gap-4 items-center">
                <form onSubmit={handleSubmit} className="space-y-4 mr-12">
                    <input
                        type="number"
                        placeholder="Enter Monthly Budget"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-12">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-1 px-2 lg:py-3 lg:px-5 rounded-xl whitespace-nowrap hover:bg-blue-700 transition"
                        >
                            Save Budget
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-red-500 text-white py-1 px-2 lg:py-3 lg:px-5 rounded-xl whitespace-nowrap hover:bg-red-600 transition"
                        >
                            Reset Budget
                        </button>
                    </div>
                </form>
                <div className="mt-3 mb-8 space-y-4">
                    <p className="text-gray-500 text-2xl">Current Budget</p>

                    <h3 className="text-4xl font-bold mt-1">
                        ₹{monthlyBudget.toLocaleString("en-IN")}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default BudgetForm;