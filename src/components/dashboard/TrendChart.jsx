import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { EmptyState } from "../common/EmptyState";
import { TrendingUp } from "lucide-react";

export function TrendChart({ transactions }) {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const totals = expenseTransactions.reduce((acc, t) => {
    const day = t.date.slice(-2);
    acc[day] = (acc[day] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.keys(totals)
    .sort()
    .map((day) => ({ day, amount: totals[day] }));

  if (data.length === 0) {
    return (
      <EmptyState message="No expense data to chart yet." icon={TrendingUp} />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#4c1d95" />
      </BarChart>
    </ResponsiveContainer>
  );
}
