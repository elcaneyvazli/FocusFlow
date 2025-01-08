import { removeToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useAppSelector } from "@/redux/store";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
  BadgeCheck,
  CircleX,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

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
    return clsx("rounded-none sm:rounded-md border", {
      "bg-gradient-to-r from-success-50 to-white border-success-500":
        variant === "success",
      "bg-gradient-to-r from-warning-50 to-white border-warning-500":
        variant === "warning",
      "bg-gradient-to-r from-error-50 to-white border-error-500":
        variant === "error",
      "bg-elevation border-border text-text": variant === "default",
    });
  };

  const getIconStyles = (variant) => {
    return clsx("h-24 w-24", {
      "text-success-500": variant === "success",
      "text-warning-500": variant === "warning",
      "text-error-500": variant === "error",
    });
  };

  return (
    <div className="fixed bottom-0 sm:bottom-32 right-0 sm:right-32 flex flex-col gap-16 z-[999] sm:w-fit w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={clsx(
              "relative min-w-full sm:w-[344px] h-fit px-8 py-8 flex flex-row justify-between items-start gap-8",
              getVariantStyles(toast.variant)
            )}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            {toast.variant === "default" ? null : (
              <div className="flex items-center justify-center p-4 rounded-full bg-white border border-[#E5E6EB]">
                {toast.variant === "success" ? (
                  <BadgeCheck className={getIconStyles("success")} />
                ) : toast.variant === "warning" ? (
                  <AlertTriangle className={getIconStyles("warning")} />
                ) : toast.variant === "error" ? (
                  <CircleX className={getIconStyles("error")} />
                ) : null}
              </div>
            )}
            <div className="flex flex-col gap-0 w-full">
              <h1 className="text-black text-md font-semibold line-clamp-1">
                {toast.title || "Task"}
              </h1>
              <p className="text-black text-sm">{toast.message}</p>
            </div>
            <X
              className="h-[18px] w-[18px] text-black cursor-pointer"
              onClick={() => handleClose(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
