import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useBudgets } from "../../hooks/useBudgets";
import { Button } from "../common/Button";
import "./BudgetForm.css";

export function BudgetsForm() {
  const { categories, selectedMonth } = useTransactions();
  const { addBudget } = useBudgets();

  const initialValue = { categoryId: "", limit: "" };
  const [formState, setFormState] = useState(initialValue);

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.categoryId === "" || Number(formState.limit) <= 0) return;

    addBudget({
      categoryId: formState.categoryId,
      limit: Number(formState.limit),
      month: selectedMonth,
    });
    setFormState(initialValue);
  };

  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  return (
    <form onSubmit={handleSubmit} className="budget-form-container">
      <div className="budget-form-group">
        <div className="budget-form-field">
          <label htmlFor="categoryId">Category</label>
          <select
            name="categoryId"
            value={formState.categoryId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Category
            </option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="budget-form-field">
          <label htmlFor="limit">Monthly Limit</label>
          <input
            type="number"
            name="limit"
            min={0}
            value={formState.limit}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="budget-form-btn-submit">
        <Button type="submit">Set Budget</Button>
      </div>
    </form>
  );
}
