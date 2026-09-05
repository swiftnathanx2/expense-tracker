import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

export function useTransactions() {
  const ctx = useContext(TransactionsContext);

  if (!ctx)
    throw new Error("useTransactions must be used TransactionsProvider");
  return ctx;
}
