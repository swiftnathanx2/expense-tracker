import { useTransactions } from "../../hooks/useTransactions";
import {
  Trash2,
  InboxIcon,
  Tag,
  Home,
  Heart,
  Car,
  Coffee,
  Briefcase,
} from "lucide-react";
import { EmptyState } from "../common/EmptyState";
import "./CategoryList.css";

const iconMap = {
  Tag,
  Home,
  Car,
  Heart,
  Coffee,
  Briefcase,
};

export const CategoryList = () => {
  const { customCategories, deleteCustomCategory } = useTransactions();

  const handleDeleteClick = (id) => {
    if (window.confirm("Delete this category")) {
      deleteCustomCategory(id);
    }
  };

  if (customCategories.length === 0) {
    return (
      <EmptyState
        message={"No custom categories yet. Create your first one!"}
        icon={InboxIcon}
      />
    );
  }

  return (
    <div className="custom-category-container">
      <div className="custom-category--header">
        <h3>Recent Categories</h3>
      </div>

      <ul className="category-list-items">
        {customCategories.map((cat) => {
          const IconComponent = iconMap[cat.icon];
          return (
            <li key={cat.id} className="category-item">
              <span
                className="category-item-dot"
                style={{ backgroundColor: cat.color }}
              ></span>

              <div className="category-item-main">
                <span className="category-item-name">{cat.name}</span>
                <span className={`category-item-type ${cat.type}`}>
                  {cat.type}
                </span>
              </div>

              <span className="category-item-icon">
                {IconComponent && <IconComponent size={18} />}
              </span>

              <button
                onClick={() => handleDeleteClick(cat.id)}
                className="category-item-delete"
              >
                <Trash2 size={16} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
