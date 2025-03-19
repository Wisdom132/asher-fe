import { ReactNode } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 shadow-lg p-6 flex flex-col border-r">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <nav className="mt-6 flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="block p-3 rounded-lg hover:bg-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/connections/find-companies"
                className="block p-3 rounded-lg hover:bg-gray-900"
              >
                Find Companies
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/connections/list"
                className="block p-3 rounded-lg hover:bg-gray-900"
              >
                Connections
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/chats"
                className="block p-3 rounded-lg hover:bg-gray-900"
              >
                Telegram Chats
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/in-chat"
                className="block p-3 rounded-lg hover:bg-gray-900"
              >
                In-chat
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className=" shadow-md p-4 flex justify-between items-center border-b bg-gray-900">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-gray-600 font-medium">Welcome, User</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="p-4 text-center shadow-md border-t">
          <p className="text-sm text-gray-500">
            &copy; 2025 Heykara. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
