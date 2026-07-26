import BudgetCard from "../components/BudgetCard";
import BudgetMsgCard from "../components/BudgetMsgCard";
import BudgetAlert from "../components/BudgetAlert";
import CategoryBudgetCard from "../components/CategoryBudgetCard";
import BudgetInsights from "../components/BudgetInsights";
import PageWrapper from "../components/PageWrapper";

const Budget = () => {
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default Budget;