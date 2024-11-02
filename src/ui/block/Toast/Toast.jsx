import { removeToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useAppSelector } from "@/redux/store";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useAppSelector((state) => state.toastMessageReducer.toasts);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 10000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, dispatch]);

  const handleClose = (id) => {
    dispatch(removeToast(id));
  };

  const getVariantStyles = (variant) => {
    switch (variant) {
      case "success":
        return "bg-gradient-to-r from-green-50 to-white border-green-500";
      case "warning":
        return "bg-gradient-to-r from-yellow-50 to-white border-yellow-500";
      case "error":
        return "bg-gradient-to-r from-red-50 to-white border-red-500";
      default:
        return "bg-white dark:bg-dark-input-bg border-input-border dark:border-dark-input-border text-primary dark:text-input-bg";
    }
  };

  return (
    <div className="fixed bottom-0 sm:bottom-32 right-0 sm:right-32 flex flex-col gap-16 z-40 sm:w-fit w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`relative ${getVariantStyles(
              toast.variant
            )} rounded-none sm:rounded-main z-40 min-w-full sm:w-[360px] h-fit border px-8 py-8 flex flex-row justify-between items-start gap-8`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            {toast.variant === "default" ? null : (
              <div className="flex items-center justify-center p-4 rounded-full bg-white border border-input-border">
                {toast.variant === "success" ? (
                  <CheckBadgeIcon className="h-24 w-24 text-green-500" />
                ) : toast.variant === "warning" ? (
                  <ExclamationTriangleIcon className="h-24 w-24 text-yellow-500" />
                ) : toast.variant === "error" ? (
                  <ExclamationCircleIcon className="h-24 w-24 text-red-500" />
                ) : null}
              </div>
            )}
            <div className="flex flex-col gap-0 w-full">
              <h1 className="text-md font-semibold line-clamp-1">
                {toast.title || "Task"}
              </h1>
              <p className="text-sm">{toast.message}</p>
            </div>
            <XMarkIcon
              className={`h-[18px] w-[18px] ${
                toast.variant === "default"
                  ? "text-primary dark:text-input-bg"
                  : "text-primary"
              }`}
              onClick={() => handleClose(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
