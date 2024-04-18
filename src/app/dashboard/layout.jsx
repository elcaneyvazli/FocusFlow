import Sidebar from "@/ui/layout/Sidebar/sidebar";
import Navbar from "@/ui/layout/Navbar/navbar";

export default function DashLayout({ children }) {
  return (
    <div className="z-50 relative flex flex-row gap-0">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col h-screen w-full overflow-y-auto relative">
        <div className="sticky top-0 w-full">
          <Navbar />
        </div>
        <div className="w-full min-h-full px-32 py-16 bg-input-bg">{children}</div>
      </div>
    </div>
  );
}
