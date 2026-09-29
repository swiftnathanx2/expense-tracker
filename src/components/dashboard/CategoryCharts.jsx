import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";
import { PieChart as PieIcon } from "lucide-react";
import { EmptyState } from "../common/EmptyState";

export function CategoryCharts({ transactions }) {
  const { categories } = useTransactions();

  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const totals = expenseTransactions.reduce((acc, t) => {
    acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.keys(totals).map((categoryId) => {
    const category = categories?.find((cat) => cat.id === categoryId);

    return {
      name: category?.name || "unknown",

      value: totals[categoryId],

      color: category?.color || "#6b7280",
    };
  });

  if (data.length === 0) {
    return (
      <EmptyState message="No expense data to chart yet!" icon={PieIcon} />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
