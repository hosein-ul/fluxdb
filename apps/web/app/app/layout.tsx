import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FFFFFF] text-[#0F172A]">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FFFFFF]">
        {children}
      </div>
    </div>
  );
}
