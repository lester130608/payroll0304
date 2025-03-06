// Archivo: app/ClientWrapper.tsx (o en components, según prefieras)
"use client";

import { SessionProvider } from "next-auth/react";
import SidebarAdmin from "@/components/SidebarAdmin";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Por ejemplo, ocultamos el sidebar en la ruta de login
    setShowSidebar(pathname !== "/auth/login");
  }, [pathname]);

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        {showSidebar && <SidebarAdmin />}
        <main className={`flex-1 ${showSidebar ? "ml-60" : ""}`}>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}