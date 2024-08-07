"use client";
import Sidebar from "@/ui/layout/Sidebar/sidebar";
import Navbar from "@/ui/layout/Navbar/navbar";

export default function DashLayout({ children }) {
  return (
    <div className="flex flex-row gap-0 relative ">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col max-h-screen w-full overflow-y-scroll bg-input-bg dark:bg-primary">
        <div className="sticky top-0 w-full z-40">
          <Navbar />
        </div>
        <div className="w-full h-full p-12 sm:p-16 xl:px-32 xl:py-16">
          {children}
        </div>
      </div>
    </div>
  );
}
