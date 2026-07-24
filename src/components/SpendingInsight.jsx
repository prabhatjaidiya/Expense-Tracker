import React, { useContext } from "react";
import {
    TrendingUp,
    Lightbulb,
    Check,
} from "lucide-react";
import ExpenseContext from "../context/ExpenseContext";

const SpendingInsights = () => {
    const { spendingInsights } = useContext(ExpenseContext);

    const cards = [];

    if (spendingInsights.alert) {
        cards.push({
            title: "High Spending Alert",
            description: `You spent ${spendingInsights.alert.percentage}% more on ${spendingInsights.alert.category} compared to last month.`,
            icon: TrendingUp,
            iconBg: "bg-red-500",
            cardBg: "bg-red-50 dark:bg-red-900/20",
        });
    }

    if (spendingInsights.savingOpportunity) {
        cards.push({
            title: "Saving Opportunity",
            description: `You can save ₹${spendingInsights.savingOpportunity.amount.toLocaleString(
                "en-IN"
            )} by reducing ${spendingInsights.savingOpportunity.category
                } expenses.`,
            icon: Lightbulb,
            iconBg: "bg-amber-500",
            cardBg: "bg-amber-50 dark:bg-amber-900/20",
        });
    }

    if (spendingInsights.savingsGrowth > 0) {
        cards.push({
            title: "Great Job!",
            description: `Your savings improved by ${spendingInsights.savingsGrowth}% compared to last month.`,
            icon: Check,
            iconBg: "bg-emerald-500",
            cardBg: "bg-emerald-50 dark:bg-emerald-900/20",
        });
    }

    if (cards.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Spending Insights
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                    Add more transactions to receive personalized insights.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 w-full h-min">

            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Spending Insights
            </h2>

            <div className="space-y-4">
                {cards.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className={`${item.cardBg} border border-gray-100 dark:border-gray-800 rounded-2xl p-5`}
                        >
                            <div className="flex items-start gap-4">

                                <div
                                    className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center text-white flex-shrink-0`}
                                >
                                    <Icon size={18} />
                                </div>

                                <div>
                                    <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SpendingInsights;