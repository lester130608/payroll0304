// app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/dashboard" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="/employees" className="hover:underline">
                Employees
              </a>
            </li>
            <li className="mb-4">
              <a href="/payroll" className="hover:underline">
                Payroll
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}