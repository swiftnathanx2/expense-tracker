import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { BudgetsPage } from "./pages/BudgetsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BudgetsProvider } from "./context/BudgetsContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function AppRoutes() {
  return (
    <div>
      <ThemeProvider>
        <TransactionsProvider>
          <BudgetsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/budgets" element={<BudgetsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </BudgetsProvider>
        </TransactionsProvider>
      </ThemeProvider>
    </div>
  );
}
