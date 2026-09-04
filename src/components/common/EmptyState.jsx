import { Inbox } from "lucide-react";
import "../common/EmptyState.css";

export function EmptyState({ message, icon }) {
  return (
    <div className="empty-state">
      {icon && <Inbox size={32} className="empty-state--icon" />}
      <p>{message}</p>
    </div>
  );
}
