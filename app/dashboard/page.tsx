"use client";

import { useSession } from "next-auth/react";
import DashboardCards from "@/components/DashboardCards";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>No tienes sesión activa. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <DashboardCards />
      {/* Aquí puedes agregar más secciones o elementos según lo necesites */}
    </div>
  );
}