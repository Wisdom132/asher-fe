import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav className="mt-4">
          <ul>
            <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
              Home
            </li>
            <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
              Chats
            </li>
            <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
              Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div>
            <span className="text-gray-600">Welcome, User</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center shadow-md">
          <p className="text-sm text-gray-600">
            &copy; 2025 Heykara. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
