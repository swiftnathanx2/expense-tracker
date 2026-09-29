import { Icon, Inbox } from "lucide-react";
import "../common/EmptyState.css";

export function EmptyState({ message, icon: Icon, children }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={32} className="empty-state--icon" />}
      <p>{message}</p>
      {children}
    </div>
  );
}
