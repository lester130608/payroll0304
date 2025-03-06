// Archivo: components/SidebarAdmin.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function SidebarAdmin() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/auth/login"; // Redirige al login tras cerrar sesión
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-md flex flex-col">
      {/* Encabezado */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-grow p-6">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/employees" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
              Employees
            </Link>
          </li>
          <li>
            <Link href="/payroll" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
              Payroll
            </Link>
          </li>
          <li>
            <Link href="/reports" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Pie con información de usuario y botón de logout */}
      <div className="p-6 border-t border-gray-200">
        {session?.user && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700">{session.user.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}