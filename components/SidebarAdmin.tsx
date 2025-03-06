"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SidebarAdmin() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-100 shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar Admin</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/employees" className="block p-2 hover:bg-gray-200">
              Employees
            </Link>
          </li>
          <li>
            <Link href="/payroll/general" className="block p-2 hover:bg-gray-200">
              Payroll General
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-2 hover:bg-gray-200">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/reports" className="block p-2 hover:bg-gray-200">
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-6">
        <button
          onClick={() => signOut({ redirect: false })}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}