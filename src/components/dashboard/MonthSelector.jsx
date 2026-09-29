import { useTransactions } from "../../hooks/useTransactions";

import "../dashboard/MonthSelector.css";

export function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useTransactions();
  return (
    <div>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => selectedMonth(e.target.value)}
        className="month-selector"
      />
    </div>
  );
}
