import { CategoryForm } from "../components/settings/CategoryForm";

export function SettingsPage() {
  return (
    <div className="settings-container">
      <div className="settings-title">
        <h3>Settings</h3>
      </div>

      <div className="settings-custom-category">
        <CategoryForm />
      </div>
    </div>
  );
}
