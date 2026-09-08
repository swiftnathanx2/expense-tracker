import { useBudgets } from "../hooks/useBudgets";
import { useTransactions } from "../hooks/useTransactions";
import { BudgetsForm } from "../components/budgets/BudgetsForm";
import { BudgetCard } from "../components/budgets/BudgetCard";
import { EmptyState } from "../components/common/EmptyState";
import { Wallet } from "lucide-react";
import "./BudgetsPage.css";

export function BudgetsPage() {
  const { budgets } = useBudgets();
  const { selectedMonth } = useTransactions();

  const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

  return (
    <div className="budgets-page-wrapper">
      <div className="budgets-page-header">
        <h3>Budgets Page</h3>
      </div>

      <div className="budgets-page-main">
        <div className="budgets-page-form">
          <BudgetsForm />
        </div>

        <div className="budgets-page-list">
          {monthBudgets.length === 0 ? (
            <EmptyState
              message="No budgets set for this month yet."
              icon={Wallet}
            />
          ) : (
            monthBudgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
