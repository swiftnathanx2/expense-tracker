import { useTransactions } from "../../hooks/useTransactions";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import "../transactions/TransactionList.css";
import { Trash2, Inbox, Pen, Plus, Minus, SearchX } from "lucide-react";
import { formatCurrency } from "../../utils/FormatCurrency";

export function TransactionList({
  transactions,
  totalCount = 0,
  onClearFilters,
  onDeleteTransactions,
  onEditClick,
  compact = false,
}) {
  const { categories } = useTransactions();

  if (transactions.length === 0) {
    if (totalCount > 0 && onClearFilters) {
      return (
        <EmptyState
          message={`No transactions match your filters`}
          icon={SearchX}
        >
          <Button onClick={onClearFilters}>Clear filters</Button>
        </EmptyState>
      );
    }
    return (
      <EmptyState
        message={`No transactions yet. Create your first one`}
        icon={Inbox}
      />
    );
  }

  return (
    <div className="transaction-list">
      {!compact && <h3 className="transaction-list-title">Transactions</h3>}

      <ul className={`transaction-list-items ${compact ? "compact" : ""}`}>
        {transactions.map((trans) => {
          const category = categories.find(
            (cat) => cat.id === trans.categoryId,
          );
          return (
            <li
              key={trans.id}
              className={`transaction-item ${compact ? "compact" : ""}`}
            >
              <span
                className="transaction-item-dot"
                style={{ backgroundColor: category?.color || "#9ca3af" }}
              ></span>

              <div className="transaction-item-main">
                <span className="transaction-item-category">
                  {category?.name}
                </span>
                <span className="transaction-item-note">
                  {trans.note || "-"}
                </span>
              </div>
              <div className="transaction-item-meta">
                <span className="transaction-item-date">{trans.date}</span>
                <span className={`transaction-item-amount ${trans.type}`}>
                  {trans.type === "expense" ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                  {formatCurrency(trans.amount)}
                </span>
              </div>

              {!compact && (
                <div className="transaction-item-actions">
                  <Button
                    onClick={() => onEditClick(trans.id)}
                    className="transaction-item-btn edit"
                  >
                    <Pen size={14} />
                  </Button>
                  <Button
                    onClick={() => onDeleteTransactions(trans.id)}
                    className="transaction-item-btn delete"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
