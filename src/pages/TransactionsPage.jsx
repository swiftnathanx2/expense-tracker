import { useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";

export function TransactionsPage() {
  const [transactions, setTransaction] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransaction((prev) => [newTransaction, ...prev]);
  };

  return (
    <div>
      <h1>Transactions Page</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
}
