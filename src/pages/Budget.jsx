import BudgetCard from "../components/BudgetCard";
import BudgetMsgCard from "../components/BudgetMsgCard";
import BudgetAlert from "../components/BudgetAlert";
import CategoryBudgetCard from "../components/CategoryBudgetCard";
import BudgetInsights from "../components/BudgetInsights";

const Budget = () => {
  return (
    <div className="space-y-4">
      <BudgetCard />

      <BudgetMsgCard />

      <CategoryBudgetCard />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BudgetAlert />

        <BudgetInsights />
      </div>
    </div>
  );
};

export default Budget;