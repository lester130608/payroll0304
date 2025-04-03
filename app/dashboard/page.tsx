"use client";

import { useSession } from "next-auth/react";
import KPICard from "@/components/KPICard";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return <p>No estás autenticado</p>;

  const kpis = [
    { title: "Total Employees", value: 58 },
    { title: "Payroll This Month", value: "$92,340" },
    { title: "Active Employees", value: 51 },
    { title: "New Hires", value: 4 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido, {session.user.name}</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} title={kpi.title} value={kpi.value} />
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/employees" className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800">Ir a Empleados</h2>
          <p className="text-sm text-gray-500">Gestión de empleados y nuevos ingresos</p>
        </a>

        <a href="/payroll" className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800">Ir a Payroll</h2>
          <p className="text-sm text-gray-500">Ingreso y revisión de datos de pago</p>
        </a>

        <a href="/reports" className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800">Ir a Reportes</h2>
          <p className="text-sm text-gray-500">Análisis de rendimiento y KPIs</p>
        </a>
      </div>
    </div>
  );
}
