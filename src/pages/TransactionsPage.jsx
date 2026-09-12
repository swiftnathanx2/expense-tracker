import { useState } from "react";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionList } from "../components/transactions/TransactionList";
import "../pages/TransactionsPage.css";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionFilter } from "../components/transactions/TransactionFilter";
import { useDebounce } from "../hooks/useDebounce";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { ConfirmDialogue } from "../components/common/ConfirmDialogue";

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

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [pendingDeleteId, setPendingDeletId] = useState(null);

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

  const handleAddClick = () => {
    setEditId(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (id) => {
    setEditId(id);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setPendingDeletId(id);
  };

  const handleConfirmDelete = () => deleteTransaction(pendingDeleteId);

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditId(null);
  };
  const handleSave = (formData) => {
    addOrUpdateTransaction(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="transaction-page-wrapper">
      <div className="transaction-page-title">
        <h3>Transactions Page</h3>
      </div>
      <div className="transaction-page-header">
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
        <div className="transaction-page-header-add-btn">
          <Button onClick={handleAddClick}>Add Transaction</Button>
        </div>
      </div>
      <div className="transaction-page-main">
        <div className="transaction-page-list">
          <TransactionList
            transactions={filteredTransactions}
            onDeleteTransactions={handleDeleteClick}
            onEditClick={handleEditClick}
          />
          <ConfirmDialogue
            isOpen={pendingDeleteId !== null}
            onClose={() => setPendingDeletId(null)}
            onConfirm={handleConfirmDelete}
            message="This transaction will be permanently deleted"
          />
        </div>
      </div>

      <Modal isOpen={isFormOpen} onClose={handleCloseModal}>
        <div className="transaction-page-form">
          <TransactionForm
            onSave={handleSave}
            initialData={editTransaction}
            isEditing={Boolean(editId)}
            onCancel={handleCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
}
