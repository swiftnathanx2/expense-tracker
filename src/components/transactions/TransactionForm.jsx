import { useState, useEffect } from "react";

import { useTransactions } from "../../hooks/useTransactions";
import "../transactions/TransactionForm.css";

const initialValue = {
  type: "expense",
  amount: "",
  categoryId: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

export function TransactionForm({ onSave, isEditing, onCancel, initialData }) {
  const [formState, setFormState] = useState(initialValue);
  const [error, setError] = useState("");

  const { categories } = useTransactions();

  useEffect(() => {
    if (initialData) {
      setFormState(initialData);
    } else {
      setFormState(initialValue);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => {
      const updatedState = { ...prev, [name]: value };

      if (name === "type") {
        const firstValidCategory = categories.find((cat) => cat.type === value);
        updatedState.categoryId = firstValidCategory
          ? firstValidCategory.id
          : "";
      }

      return updatedState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formState.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (formState.categoryId === "") {
      setError("Please select a category");
      return;
    }

    setError("");

    onSave({ ...formState, amount: Number(formState.amount) });
    setFormState(initialValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="trans-form-container">
        <div className="trans-form-header">
          <h3>{isEditing ? "Edit Transaction" : "Add Transaction"}</h3>
          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="trans-form-group">
          <div className="trans-form-field">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              min={0}
              value={formState.amount}
              onChange={handleChange}
            />
          </div>

          <div className="trans-form-field">
            <label htmlFor="type">Type</label>
            <select name="type" value={formState.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="trans-form-field">
            <label htmlFor="categoryId">Category</label>
            <select
              name="categoryId"
              value={formState.categoryId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories
                .filter((cat) => cat.type === formState.type)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="trans-form-field">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
          </div>

          <div className="trans-form-field trans-form-field--wide">
            <label htmlFor="note">Note</label>
            <textarea
              name="note"
              value={formState.note}
              onChange={handleChange}
              placeholder="type note"
            ></textarea>
          </div>
        </div>
        <div className="trans-form-actions">
          <button type="submit" className="trans-form-submit">
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="trans-form-cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
