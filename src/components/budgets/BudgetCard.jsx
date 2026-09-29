import { useTransactions } from "../../hooks/useTransactions";
import "../budgets/BudgetCard.css";

const getBudgetStatus = (percent) => {
  if (percent >= 100) return "danger";
  if (percent >= 50) return "warning";
  return "safe";
};

const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split("-");

  const date = new Date(year, month - 1);

  return date.toLocaleDateString("en-Us", { month: "long", year: "numeric" });
};

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
  const status = getBudgetStatus((spent / budget.limit) * 100);

  return (
    <div className="budget-card">
      <div className="budget-card-header">
        <span className="budget-card-name">{category?.name}</span>
        <span className="budget-card-month">{formatMonth(budget.month)}</span>
        <span className={`budget-card-amount ${status}`}>
          {spent} / {budget.limit}
        </span>
      </div>

      <div className="budget-progress-track">
        <div
          className={`budget-progress-fill ${status}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {status === "danger" && (
        <p className="budget-warning">Over budget by {spent - budget.limit}</p>
      )}
    </div>
  );
}
