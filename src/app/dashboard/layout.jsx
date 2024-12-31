"use client";
import Navbar from "@/ui/layout/Navbar/navbar";
import useScreenWidth from "@/utils/useScreenWidth";
import NavMenu from "@/ui/layout/Navbar/NavMenu";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import SelectedTaskModul from "@/ui/component/Dashboard/todotask/modul/SelectedTaskModul";
import Toast from "@/ui/block/Toast/Toast";
import EditTaskModul from "@/ui/component/Dashboard/todotask/modul/editTaskModul";
import NewGroupModal from "@/ui/component/Dashboard/Group/Modal/NewGroupModal";
import NewGroupMember from "@/ui/component/Dashboard/Group/Modal/NewGroupMember";
import NewProjectModal from "@/ui/component/Dashboard/Group/Modal/NewProjectModal";

export default function DashLayout({ children }) {
  const mobilescreen = useScreenWidth(1024);

  return (
    <div className="flex flex-row gap-0 relative pb-80 lg:pb-0 bg-input-bg dark:bg-primary">
      <div className="flex flex-col min-h-screen min-w-full bg-input-bg dark:bg-primary">
        {mobilescreen ? (
          <div className="z-[70]">
            <Navbar />
            <div className="fixed bottom-0 left-0 w-full z-[70]">
              <NavMenu />
            </div>
          </div>
        ) : (
          <div className="z-[60]">
            <Navbar />
          </div>
        )}
        <div
          className="min-w-full py-12 xl:py-16 z-50 container pb-[80px]"
          style={{
            minHeight: "calc(100vh - 80px)",
          }}
        >
          {children}
        </div>
      </div>
      <div className="z-[70]">
        <NewTaskModul />
        <SelectedTaskModul />
        <Toast />
        <EditTaskModul />
        <NewGroupModal />
        <NewGroupMember />
        <NewProjectModal />
      </div>
    </div>
  );
}
