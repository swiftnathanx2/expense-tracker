import { useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionList } from "../components/transactions/TransactionList";
import "../pages/TransactionsPage.css";

export function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const [editId, setEditId] = useState(null);

  const handleSaveTransaction = (formData) => {
    if (editId) {
      setTransactions((prev) => {
        return prev.map((t) => (t.id === editId ? { ...t, ...formData } : t));
      });
      setEditId(null);
    } else {
      setTransactions((prev) => [
        { id: crypto.randomUUID(), ...formData },
        ...prev,
      ]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = transactions?.find((t) => t.id === editId);

  const handleEditClick = (id) => {
    setEditId(id);
  };

  const handleCancelEdit = (id) => {
    setEditId(null);
  };

  return (
    <div className="transaction-page-wrapper">
      <div className="transaction-page-header">
        <h1>Transactions Page</h1>
      </div>
      <div className="transaction-page-form">
        <TransactionForm
          onSave={handleSaveTransaction}
          initialData={editTransaction}
          isEditing={Boolean(editId)}
          onCancel={handleCancelEdit}
        />
      </div>
      <div className="transaction-page-list">
        <h3>Recent Transactions</h3>
        <TransactionList
          transactions={transactions}
          onDeleteTransactions={handleDeleteTransaction}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}
