import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import defaultCategories from "../data/categories";

export const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);

  const [customCategories, setCustomCategories] = useLocalStorage(
    "customCategories",
    [],
  );

  const [editId, setEditId] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const addOrUpdateTransaction = (formData) => {
    if (editId) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...formData } : t)),
      );
      setEditId(null);
    } else {
      setTransactions((prev) => [
        { id: crypto.randomUUID(), ...formData },
        ...prev,
      ]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const categories = [...defaultCategories, ...customCategories];

  const value = {
    transactions,
    categories,
    customCategories,
    setCustomCategories,
    editId,
    setEditId,
    selectedMonth,
    setSelectedMonth,
    addOrUpdateTransaction,
    deleteTransaction,
  };

  return (
    <div>
      <TransactionsContext.Provider value={value}>
        {children}
      </TransactionsContext.Provider>
    </div>
  );
}
