// Archivo: app/payroll/page.tsx
"use client";

import React from "react";
import PayrollTable from "@/components/PayrollTable";
import { Employee } from "@/types/interfaces";

export default function PayrollPage() {
  // Datos de ejemplo (dummy) para probar la tabla.
  const dummyEmployees: Employee[] = [
    {
      id: "1",
      nombre: "Alice Johnson",
      tipo: "administrativo",
      supervisor_id: "admin-1",
      estado: "activo",
      tarifa: 25,
    },
    {
      id: "2",
      nombre: "Bob Smith",
      tipo: "administrativo",
      supervisor_id: "admin-1",
      estado: "activo",
      tarifa: 30,
    },
    // Agrega más empleados según sea necesario
  ];

  // Aquí se determina el tipo de supervisor; para este ejemplo, usamos "administrativo"
  const supervisorType: Employee["tipo"] = "administrativo";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payroll for Supervisor</h1>
      <PayrollTable employees={dummyEmployees} supervisorType={supervisorType} />
    </div>
  );
}