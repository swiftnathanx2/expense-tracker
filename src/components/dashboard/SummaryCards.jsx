import { formatCurrency } from "../../utils/FormatCurrency";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import "./SummaryCards.css";

export function SummaryCards({ totalIncome, totalExpenses, netBalance }) {
  const cards = [
    { label: "Income", value: totalIncome, tone: "income", icon: TrendingUp },
    {
      label: "Expense",
      value: totalExpenses,
      tone: "expense",
      icon: TrendingDown,
    },
    {
      label: "Net Balance",
      value: netBalance,
      tone: netBalance >= 0 ? "income" : "expense",
      icon: Wallet,
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div className="summary-card" key={c.label}>
            <div className="summary-card--top">
              <span className="summary-card--label">{c.label}</span>
              <Icon
                size={18}
                className={`summary-card--icon summary-card--icon--${c.tone}`}
              />
            </div>
            <span
              className={`summary-card--value summary-card--value--${c.tone}`}
            >
              {formatCurrency(c.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
