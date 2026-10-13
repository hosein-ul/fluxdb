import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluxDB — Collaborative Database Schema Studio",
  description:
    "Design your database schema together. Real-time visual ER diagram editor, automated SQL migrations, and export to Prisma, Drizzle, and raw SQL.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fragment+Mono:ital@0;1&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07090E] text-[#F0F4FF] antialiased selection:bg-[#2563EB]/30 selection:text-[#93C5FD]">
        {children}
      </body>
    </html>
  );
}
