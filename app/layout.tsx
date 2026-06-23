import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic SE Training Course",
  description: "Zero to interview-ready for Agentic Solutions Engineer roles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100">{children}</body>
    </html>
  );
}
