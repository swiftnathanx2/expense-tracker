import { useTransactions } from "../../hooks/useTransactions";
import "../budgets/BudgetCard.css";

export function BudgetCard({ budget }) {
  const { transactions, categories } = useTransactions();

  const category = categories.find((cat) => cat.id === budget.categoryId);

  const spent = transactions
    .filter(
      (t) =>
        t.categoryId === budget.categoryId &&
        t.type === "expense" &&
        t.date.startsWith(budget.month),
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const percent = Math.min((spent / budget.limit) * 100, 100);
  const isOverBudget = spent > budget.limit;

  return (
    <div className="budget-card">
      <div className="budget-card-header">
        <span className="budget-card-name">{category?.name}</span>
        <span
          className={
            isOverBudget ? "budget-card-status over" : "budget-card-status"
          }
        >
          {spent} / {budget.limit}
        </span>
      </div>

      <div className="budget-progress-track">
        <div
          className={
            isOverBudget ? "budget-progress-fill over" : "budget-progress-fill"
          }
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {isOverBudget && (
        <p className="budget-warning">Over budget by {spent - budget.limit}</p>
      )}
    </div>
  );
}
