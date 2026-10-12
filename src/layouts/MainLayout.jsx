import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboardIcon,
  ArrowLeftRight,
  PiggyBank,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../hooks/useTheme";
import "./MainLayout.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboardIcon, end: true },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Expense Tracker</h2>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link--active" : "sidebar-link"
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </aside>
      <main className="main-content">
        <div className="main-content--wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
