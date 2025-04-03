import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import SidebarAdmin from "@/components/SidebarAdmin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Payroll",
  description: "Dashboard para la gestión de payroll",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex">
          <SidebarAdmin />
          <div className="ml-64 flex-1 p-4">
            <ClientWrapper>{children}</ClientWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}