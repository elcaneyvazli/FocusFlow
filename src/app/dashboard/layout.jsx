import Sidebar from "@/ui/layout/Sidebar/sidebar";
import Navbar from "@/ui/layout/Navbar/navbar";
import MobileSidebar from "@/ui/layout/Sidebar/MobileSidebar";

export default function DashLayout({ children }) {
  return (
    <div className="flex flex-row gap-0 relative">
      <MobileSidebar />
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col min-h-screen w-full overflow-y-auto relative">
        <div className="sticky top-0 w-full">
          <Navbar />
        </div>
        <div className="w-full h-full p-12 sm:p-16 xl:px-32 xl:py-16 bg-input-bg">
          {children}
        </div>
      </div>
    </div>
  );
}
