import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const BudgetsContext = createContext(null);

export function BudgetsProvider(children) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);

  const addBudget = (budgetData) => {
    setBudgets((prev) => [{ id: crypto.randomUUID(), ...budgetData }, ...prev]);
  };

  const deleteBudget = (id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  const value = {
    budgets,
    addBudget,
    deleteBudget,
  };

  return (
    <div>
      <BudgetsContext.Provider value={value}>
        {children}
      </BudgetsContext.Provider>
    </div>
  );
}
