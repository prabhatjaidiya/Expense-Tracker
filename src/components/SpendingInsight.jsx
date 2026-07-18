import React, { useContext } from "react";
import {
    TrendingUp,
    Lightbulb,
    Check,
    ChevronRight,
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
            cardBg: "bg-red-50",
        });
    }

    if (spendingInsights.savingOpportunity) {
        cards.push({
            title: "Saving Opportunity",
            description: `You can save ₹${spendingInsights.savingOpportunity.amount.toLocaleString(
                "en-IN"
            )} by reducing ${spendingInsights.savingOpportunity.category} expenses.`,
            icon: Lightbulb,
            iconBg: "bg-amber-400",
            cardBg: "bg-amber-50",
        });
    }

    if (spendingInsights.savingsGrowth > 0) {
        cards.push({
            title: "Great Job!",
            description: `Your savings improved by ${spendingInsights.savingsGrowth}% compared to last month.`,
            icon: Check,
            iconBg: "bg-emerald-500",
            cardBg: "bg-emerald-50",
        });
    }

    if (cards.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-4">Spending Insights</h2>
                <p className="text-gray-500">
                    Add more transactions to receive personalized insights.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl h-min lg:mt-4 w-full shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Spending Insights
            </h2>

            <div className="space-y-4">
                {cards.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className={`${item.cardBg} rounded-2xl py-5 flex items-center justify-between`}
                        >
                            <div className="flex items-center">
                                <div
                                    className={`w-10 h-10 mx-2 rounded-full ${item.iconBg} flex items-center justify-center text-white`}
                                >
                                    <Icon size={16} />
                                </div>

                                <div>
                                    <h3 className="text-md font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.description}</p>
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