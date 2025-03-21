"use client"
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}
interface User {
  userType: string;
  telegramHandle: string;
  fundOrCompany: string;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  if (!user) return null;
  
    const routes = [
      { href: "#", label: "Home", roles: ["investor", "company"] },
      {
        href: "/dashboard/connections",
        label: "Connections",
        roles: ["investor", "company"],
      },
      {
        href: "/dashboard/companies",
        label: "Find Companies",
        roles: ["investor"],
      },
      {
        href: "/dashboard/chats",
        label: "Telegram Chats",
        roles: ["investor"],
      },
      {
        href: "/dashboard/chat-requests",
        label: "Telegram Chat Requests",
        roles: ["company"],
      },
      {
        href: "/dashboard/in-chat",
        label: "In-chat",
        roles: ["investor", "company"],
      },
      { href: "/auth/login", label: "Logout", roles: ["investor", "company"] },
    ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shadow-lg p-6 flex flex-col border-r border-r-gray-700">
        <h2 className="text-2xl font-bold text-gray-500">Dashboard</h2>
        <nav className="mt-6 flex-1">
          <ul className="space-y-2">
            {routes
              .filter((route) =>
                route.roles.includes(user.userType.toLowerCase())
              )
              .map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="block p-3 rounded-lg hover:bg-gray-900"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className=" shadow-md p-4 flex justify-between items-center border-b border-b-gray-700 ">
          <h1 className="text-xl font-semibold ">Dashboard</h1>
          <div className=" font-medium flex flex-col justify-end items-end">
            <div>Welcome, {user.fundOrCompany}</div>
            <div
              className={`badge ${
                user.userType === "Company" ? "badge-secondary" : "badge-info"
              }`}
            >
              {user.userType}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="p-4 text-center shadow-md border-t border-t-gray-700">
          <p className="text-sm text-gray-500">
            &copy; 2025 Asher. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
