"use client";
import { DM_Sans } from "next/font/google";
import Navbar from "@/ui/module/layout/Navbar/Navbar";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import dynamic from "next/dynamic";
import Toast from "@/ui/module/blocks/Toast/Toast";
import NewTask from "@/ui/module/components/DashboardPage/TodotaskPage/Modal/NewTask/NewTask";
import Dialog from "@/ui/module/blocks/Dialog/Dialog";
import { useCallback } from "react";
import { closeDialog } from "@/redux/features/DialogSlice/DialogSlice";
import { deleteTask } from "@/services/task.services";
import { authLogout } from "@/redux/features/AuthSlice/AuthSlice";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../../../public/fonts/Satoshi-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
import EditTask from "@/ui/module/components/DashboardPage/TodotaskPage/Modal/EditTask/EditTask";

const NavMenu = dynamic(() => import("@/ui/module/layout/Navbar/NavMenu"), {
  loading: () => (
    <div className="w-full flex items-center justify-between animate-pulse">
      <div className="flex flex-row items-center justify-between lg:justify-center gap-8 rounded-none lg:rounded-full w-full lg:w-fit px-16 py-16 lg:p-4 relative lg:bg-transparent bg-elevation">
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  ),
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export default function DashClientSideLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen, title, message, variant, dialogType, data } = useAppSelector(
    (state) => state.dialog
  );

  const handleConfirm = useCallback(async () => {
    if (!dialogType) return;

    try {
      switch (dialogType) {
        case "deleteTask":
          await deleteTask(data.taskId);
          if (data.onMutate) data.onMutate();
          dispatch(
            addToast({
              id: Date.now(),
              title: "Success",
              message: "Task deleted successfully",
              variant: "success",
            })
          );
          break;

        case "logout":
          await dispatch(authLogout()).unwrap();
          dispatch(
            addToast({
              id: Date.now(),
              title: "Success",
              message: "Logged out successfully",
              variant: "success",
            })
          );
          router.push("/login");
          break;
      }
    } catch (error) {
      dispatch(
        addToast({
          id: Date.now(),
          title: "Error",
          message: `Failed to ${
            dialogType === "deleteTask" ? "delete task" : "logout"
          }`,
          variant: "error",
        })
      );
    }

    dispatch(closeDialog());
  }, [dialogType, data, dispatch, router]);

  const mobilescreen = useScreenWidth(1024);
  return (
    <div
      className={`${satoshi.className} relative min-h-[100dvh] max-h-[100dvh] h-[100dvh] flex flex-col gap-0 bg-elevation`}
    >
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
        className="px-12 pb-12 w-full"
        style={{
          minHeight: "calc(100dvh - 64px)",
          maxHeight: "calc(100dvh - 64px)",
        }}
      >
        <div className="w-full min-h-full h-full max-h-full bg-background border border-border rounded-md overflow-y-auto">
          {children}
        </div>
      </div>
      <Toast />
      <NewTask />
      <EditTask />
      <Dialog
        isOpen={isOpen}
        title={title}
        message={message}
        variant={variant}
        onConfirm={handleConfirm}
        onClose={() => dispatch(closeDialog())}
      />
    </div>
  );
}
