import { useBudgets } from "../hooks/useBudgets";
import { useTransactions } from "../hooks/useTransactions";
import { BudgetForm } from "../components/budgets/BudgetsForm";
import { BudgetCard } from "../components/budgets/BudgetCard";
import { EmptyState } from "../components/common/EmptyState";
import { Wallet } from "lucide-react";

export function BudgetsPage() {
  const { budgets } = useBudgets();
  const { selectedMonth } = useTransactions();

  const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

  return (
    <div>
      <h3>Budgets</h3>
      <BudgetForm />

      {monthBudgets.length === 0 ? (
        <EmptyState
          message="No budgets set for this month yet."
          icon={Wallet}
        />
      ) : (
        <div>
          {monthBudgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
}
