import { useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionList } from "../components/transactions/TransactionList";
import "../pages/TransactionsPage.css";
import { useTransactions } from "../hooks/useTransactions";

export function TransactionsPage() {
  const {
    transactions,
    editId,
    addOrUpdateTransaction,
    deleteTransaction,
    setEditId,
  } = useTransactions();

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
          onSave={addOrUpdateTransaction}
          initialData={editTransaction}
          isEditing={Boolean(editId)}
          onCancel={handleCancelEdit}
        />
      </div>
      <div className="transaction-page-list">
        <h3>Recent Transactions</h3>
        <TransactionList
          transactions={transactions}
          onDeleteTransactions={deleteTransaction}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}
