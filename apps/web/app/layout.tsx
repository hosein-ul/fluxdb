import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluxDB — Collaborative Database Schema Studio",
  description:
    "The collaborative database studio for modern engineering teams. Design visual ER diagrams, validate constraints, and compile automated migrations for PostgreSQL, Drizzle, and Prisma.",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&f[]=general-sans@600,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fragment+Mono:ital@0;1&family=Geist+Mono:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFFFFF] text-[#0F172A] antialiased selection:bg-[#0F172A] selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
