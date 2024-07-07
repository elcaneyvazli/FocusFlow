import { removeToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useAppSelector } from "@/redux/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

  return (
    <div className="fixed bottom-32 right-32 flex flex-col gap-16 z-40">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            className="relative dark:bg-dark-input-bg bg-white border border-input-border dark:border-dark-input-border rounded-main z-40"
            initial={{ opacity: 0, y: 100, x: 0 }}
            animate={{ opacity: 1, y: 100, x: 0 }}
            exit={{ opacity: 0, y: 0, x: 100 }}
          >
            <div className="py-8 px-16 flex flex-row justify-between items-center gap-64">
              <div className="flex flex-col gap-0">
                <h1 className="text-primary dark:text-input-bg text-lg font-medium">
                  Task Created
                </h1>
                <p className="text-light text-md line-clamp-1 w-full">
                  {toast.message}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 rounded-full bg-white dark:bg-primary absolute -top-16 -right-16 border border-input-border dark:border-dark-input-border">
              <XMarkIcon
                className="h-16 w-16 text-primary dark:text-input-bg"
                onClick={() => handleClose(toast.id)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
