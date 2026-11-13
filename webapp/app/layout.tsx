import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REA — Reverse Anything",
  description: "A workspace for evidence-led software reverse engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
