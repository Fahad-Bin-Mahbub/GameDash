import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameDash",
  description: "Real-time gaming dashboard (modularized into Next.js)"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
