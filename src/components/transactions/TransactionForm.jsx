import { useState } from "react";
import defaultCategories from "../../data/categories";

const initialValue = {
  type: "expense",
  amount: "",
  categoryId: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

export function TransactionForm({ onAddTransaction }) {
  const [formState, setFormState] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
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

    const newTransaction = {
      id: crypto.randomUUID(),
      ...formState,
    };

    onAddTransaction(newTransaction);
    setFormState(initialValue);
    console.log(formState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <h3>Add Transactions</h3>
          {error && <p className="form-error">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            min={0}
            value={formState.amount}
            onChange={handleChange}
          />
          <label htmlFor="type">Type</label>
          <select name="type" value={formState.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label htmlFor="category">Category</label>
          <select
            name="categoryId"
            value={formState.categoryId}
            onChange={handleChange}
          >
            {defaultCategories
              .filter((cat) => cat.type === formState.type)
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
          />
          <label htmlFor="note">Note</label>
          <textarea
            name="note"
            value={formState.note}
            onChange={handleChange}
            placeholder="type note"
          ></textarea>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}
