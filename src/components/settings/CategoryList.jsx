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
import "../settings/CategoryList.css";

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
        message={"No custome categories yet. Create your first one!"}
        icon={InboxIcon}
      />
    );
  }

  return (
    <div className="custom-category-container">
      <div className="custom-category--header">
        <h3>Recent Categories</h3>
      </div>
      <div className="custom-category--list">
        <div className="custom-category--row-header">
          <span>Color</span>
          <span>Name</span>
          <span>Type</span>
          <span>Icon</span>
          <span>Delete</span>
        </div>

        <div className="custom-category--content">
          <ul className="custom-category--list">
            {customCategories.map((cat) => {
              const IconComponent = iconMap[cat.icon];
              return (
                <li key={cat.id} className="custom-category--list-item">
                  <span
                    className="custom-category--swatch"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  <span className="custom-category--name">{cat.name}</span>
                  <span className="custom-category--name">{cat.type}</span>
                  <span
                    className={
                      cat.type === "income"
                        ? "custom-category--icon-income"
                        : "custom-category--icon-expense"
                    }
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </span>
                  <button
                    onClick={() => handleDeleteClick(cat.id)}
                    className="custom-category--delete-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
