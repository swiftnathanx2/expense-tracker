import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import "../settings/CategoryForm.css";

const initialValue = {
  name: "",
  type: "expense",
  color: "#4C1D95",
  icon: "Tag",
};

const iconOptions = ["Tag", "Home", "Car", "Coffee", "Briefcase", "Heart"];

export function CategoryForm() {
  const { addCustomCategory } = useTransactions();

  const [formState, setFormstate] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormstate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formState.name.trim() === "") {
      return;
    }

    addCustomCategory(formState);

    setFormstate(initialValue);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>Add Category</h3>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="type">Type</label>
            <select name="type" value={formState.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              name="color"
              value={formState.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="icon">Icon</label>
            <select name="icon" value={formState.icon} onChange={handleChange}>
              {iconOptions.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit"> Add Category</button>
        </div>
      </form>
    </div>
  );
}
