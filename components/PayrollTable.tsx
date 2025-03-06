// Archivo: components/PayrollTable.tsx
"use client";

import React from "react";
import { Employee } from "@/types/interfaces";

interface PayrollTableProps {
  employees: Employee[];
  supervisorType: "administrativo" | "TCM" | "clinician" | "RBT" | "BCBA" | "BCABA";
}

// Mapeo de campos a mostrar para cada tipo de supervisor.
// Aquí puedes ajustar los campos específicos según las necesidades de cada grupo.
const fieldMapping: Record<PayrollTableProps["supervisorType"], (keyof Employee)[]> = {
  administrativo: ["id", "nombre", "estado", "tarifa"],
  TCM: ["id", "nombre", "estado", "tarifa"],
  clinician: ["id", "nombre", "estado", "tarifa"],
  RBT: ["id", "nombre", "estado", "tarifa"],
  BCBA: ["id", "nombre", "estado", "tarifa"],
  BCABA: ["id", "nombre", "estado", "tarifa"],
};

export default function PayrollTable({ employees, supervisorType }: PayrollTableProps) {
  const fieldsToShow = fieldMapping[supervisorType];

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {fieldsToShow.map((field) => (
              <th
                key={field}
                className="border p-2 text-left text-sm font-medium text-gray-700"
              >
                {field.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="even:bg-gray-50">
              {fieldsToShow.map((field) => (
                <td key={field} className="border p-2 text-sm text-gray-900">
                  {emp[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}