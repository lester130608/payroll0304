"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SidebarAdmin() {
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const router = useRouter();

  const toggleReports = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-4 flex-1">
        <ul>
          <li className="p-2">
            <Link href="/dashboard">
              <span className="hover:bg-gray-700 p-2 rounded block">Dashboard</span>
            </Link>
          </li>
          <li className="p-2">
            <Link href="/employees">
              <span className="hover:bg-gray-700 p-2 rounded block">Employees</span>
            </Link>
          </li>
          <li className="p-2">
            <Link href="/payroll">
              <span className="hover:bg-gray-700 p-2 rounded block">Payroll</span>
            </Link>
          </li>
          <li className="p-2">
  <Link href="/reports">
    <span className="hover:bg-gray-700 p-2 rounded block">Reports</span>
  </Link>
</li>
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
