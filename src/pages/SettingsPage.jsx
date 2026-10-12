import { CategoryForm } from "../components/settings/CategoryForm";
import { CategoryList } from "../components/settings/CategoryList";
import "./SettingsPage.css";

export function SettingsPage() {
  return (
    <div className="settings-page-wrapper">
      <div className="settings-page-title">
        <h3>Settings</h3>
      </div>
      <div className="settings-page-main">
        <div className="settings-custom-category">
          <CategoryForm />
        </div>
        <div className="settings-custom-category-list">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
