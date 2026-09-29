import { useMemo } from "react";
import { TransactionList } from "../components/transactions/TransactionList";
import { useTransactions } from "../hooks/useTransactions";
import { SummaryCards } from "../components/dashboard/SummaryCards";
import { CategoryCharts } from "../components/dashboard/CategoryCharts";
import { TrendChart } from "../components/dashboard/TrendChart";

import { MonthSelector } from "../components/dashboard/MonthSelector";
import "./DashboardPage.css";

export function DashboardPage() {
  const { transactions = [], selectedMonth = "" } = useTransactions();

  const monthTransactions = useMemo(
    () => transactions.filter((t) => t.date.startsWith(selectedMonth)),
    [transactions, selectedMonth],
  );

  const { totalIncome, totalExpenses } = useMemo(
    () =>
      monthTransactions.reduce(
        (acc, t) => {
          const amount = Number(t.amount) || 0;
          if (t.type === "income") acc.totalIncome += amount;
          else acc.totalExpenses += amount;

          return acc;
        },
        { totalIncome: 0, totalExpenses: 0 },
      ),
    [monthTransactions],
  );

  const netBalance = totalIncome - totalExpenses;

  const recent = useMemo(
    () =>
      [...monthTransactions]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),
    [monthTransactions],
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-page--header">
        <div>
          <h3>Dashboard</h3>
          <p className="dashboard-page--subtitle">
            Overview for {selectedMonth}
          </p>
        </div>
        <MonthSelector />
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netBalance={netBalance}
      />

      <div className="dashboard-page--main">
        <div className="dashboard-page--chart-placeholder">
          <CategoryCharts transactions={monthTransactions} />
          <TrendChart transactions={monthTransactions} />
        </div>
        <div className="dashboard-page--recent">
          <TransactionList transactions={recent} compact />
        </div>
      </div>
    </div>
  );
}
