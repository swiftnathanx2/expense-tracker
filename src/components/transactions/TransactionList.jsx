import { useTransactions } from "../../hooks/useTransactions";
import { EmptyState } from "../common/EmptyState";
import "../transactions/TransactionList.css";
import { Trash2, Inbox, Pen } from "lucide-react";

export function TransactionList({
  transactions,
  onDeleteTransactions,
  onEditClick,
  compact = false,
}) {
  const { categories } = useTransactions();

  if (transactions.length === 0) {
    return (
      <EmptyState
        message={`No transactions yet. Create your first one`}
        icon={Inbox}
      />
    );
  }

  const handleDeleteClick = (id) => {
    if (window.confirm("Delete this transaction")) {
      onDeleteTransactions(id);
    }
  };
  return (
    <div>
      <div className="transaction-header">
        <h3>Recent Transactions</h3>
      </div>
      <div className="transaction-list">
        <div
          className={`transaction-row transaction-row--header ${compact ? "transaction-row--compact" : ""}`}
        >
          <span>Amount</span>
          <span>Type</span>
          <span>Category</span>
          <span>Date</span>
          <span>Note</span>
          {!compact && <span>Delete</span>}
          {!compact && <span>Edit</span>}
        </div>
        <div className="transaction-body">
          <ul>
            {transactions.map((trans) => {
              const category = categories.find(
                (cat) => cat.id === trans.categoryId,
              );
              return (
                <li
                  key={trans.id}
                  className={`transaction-row ${compact ? "transaction-row--compact" : ""}`}
                >
                  <span className={trans.type}>
                    {trans.type === "expense" ? "-" : "+"}
                    {trans.amount}
                  </span>
                  <span>{trans.type}</span>
                  <span>{category?.name}</span>
                  <span>{trans.date}</span>
                  <span>{trans.note}</span>
                  {!compact && (
                    <span>
                      <button
                        onClick={() => handleDeleteClick(trans.id)}
                        className="transaction-row--delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </span>
                  )}
                  {!compact && (
                    <span>
                      <button
                        onClick={() => onEditClick(trans.id)}
                        className="transaction-row--edit"
                      >
                        <Pen size={16} />
                      </button>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
