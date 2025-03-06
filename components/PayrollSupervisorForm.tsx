"use client";

import { useState, useEffect } from "react";
import { Employee } from "@/types/interfaces"; // Asegúrate de que la ruta sea la correcta

export default function PayrollSupervisorForm() {
  // Inicializamos la lista de empleados con un arreglo vacío
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Simulamos la carga de datos; reemplaza este bloque por la llamada a tu API
  useEffect(() => {
    // Ejemplo de datos simulados
    const fetchedEmployees: Employee[] = [
      {
        id: "1",
        nombre: "Alice Johnson",
        tipo: "administrativo",
        supervisor_id: "sup1",
        estado: "activo",
        tarifa: 20,
      },
      {
        id: "2",
        nombre: "Bob Smith",
        tipo: "TCM",
        supervisor_id: "sup1",
        estado: "activo",
        tarifa: 25,
      },
      // Puedes agregar más empleados aquí…
    ];
    setEmployees(fetchedEmployees);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payroll Supervisor Form</h1>
      {employees && employees.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Employee ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Rate</th>
              {/* Agrega más columnas según necesites */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">{employee.id}</td>
                <td className="border px-4 py-2">{employee.nombre}</td>
                <td className="border px-4 py-2">{employee.tipo}</td>
                <td className="border px-4 py-2">{employee.estado}</td>
                <td className="border px-4 py-2">{employee.tarifa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees available</p>
      )}
    </div>
  );
}