import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluxDB — Visual Schema Studio & Migration Engine",
  description:
    "Engineering console for collaborative database schema design, visual foreign-key topologies, and deterministic SQL migration generation.",
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
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400,300&f[]=general-sans@600,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fragment+Mono:ital@0;1&family=Geist+Mono:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] antialiased selection:bg-[#F59E0B]/30 selection:text-[#FCD34D]">
        {children}
      </body>
    </html>
  );
}
