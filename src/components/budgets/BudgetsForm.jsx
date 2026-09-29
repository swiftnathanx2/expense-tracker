import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useBudgets } from "../../hooks/useBudgets";
import "./BudgetForm.css";

export function BudgetForm() {
  const { categories, selectedMonth } = useTransactions();
  const { addBudget } = useBudgets();

  const initialValue = { categoryId: "", limit: "" };
  const [formState, setFormState] = useState(initialValue);

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
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <div className="form-field">
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

        <div className="form-field">
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

      <button type="submit" className="form-submit">
        Set Budget
      </button>
    </form>
  );
}
