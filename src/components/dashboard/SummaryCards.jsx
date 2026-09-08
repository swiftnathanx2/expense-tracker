import { formatCurrency } from "../../utils/FormatCurrency";
import "./SummaryCards.css";

export function SummaryCards({ totalIncome, totalExpenses, netBalance }) {
  const cards = [
    { label: "Income", value: "totalIncome", tone: "income" },
    { label: "Expense", value: "totalExpense", tone: "expense" },
    {
      label: "Net Balance",
      value: "netBalance",
      tone: netBalance >= 0 ? "income" : "expense",
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((c) => (
        <div className="summary-card" key={c.label}>
          <span className="summary-card--label">{c.label}</span>
          <span
            className={`summary-card--value summary-card--value--${c.tone}`}
          >
            {formatCurrency(c.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
