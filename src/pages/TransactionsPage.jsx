import { useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionList } from "../components/transactions/TransactionList";
import "../pages/TransactionsPage.css";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionFilter } from "../components/transactions/TransactionFilter";
import { useDebounce } from "../hooks/useDebounce";

export function TransactionsPage() {
  const {
    transactions,
    editId,
    addOrUpdateTransaction,
    deleteTransaction,
    setEditId,
    categories,
    selectedMonth,
    setSelectedMonth,
  } = useTransactions();

  const [typeFilter, setTypeFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  const filteredTransactions = transactions.filter((t) => {
    const monthMatch = !selectedMonth || t.date.startsWith(selectedMonth);

    const typeMatch = typeFilter === "all" || t.type === typeFilter;

    const catMatch =
      categoryFilter === "all" || t.categoryId === categoryFilter;

    const searchMatch = t.note
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return monthMatch && typeMatch && catMatch && searchMatch;
  });

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
        <h3>Transactions Page</h3>
      </div>
      <div className="transaction-page-filters">
        <TransactionFilter
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
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
        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransactions={deleteTransaction}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}
