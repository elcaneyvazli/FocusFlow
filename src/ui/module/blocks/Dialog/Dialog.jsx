import { AlertTriangle, BadgeCheck, Bell, CircleX, X } from "lucide-react";
import React from "react";
import { closeDialog } from "@/redux/features/DialogSlice/DialogSlice";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import Button from "../Button/Button";

const Dialog = ({ onConfirm, dialogKey }) => {
  const dispatch = useDispatch();
  const {
    isOpen,
    title,
    message,
    variant,
    dialogKey: activeDialogKey,
  } = useAppSelector((state) => state.dialog);

  const shouldShow = isOpen && dialogKey === activeDialogKey;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch(closeDialog());
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const getVariantStyles = (variant) => {
    return clsx("rounded-md border", {
      "bg-gradient-to-r from-success-50 to-white border-success-500":
        variant === "success",
      "bg-gradient-to-r from-warning-50 to-white border-warning-500":
        variant === "warning",
      "bg-gradient-to-r from-error-50 to-white border-error-500":
        variant === "error",
      "bg-background border-border": variant === "default",
    });
  };

  const getIconStyles = (variant) => {
    return clsx("h-24 w-24", {
      "text-success-500": variant === "success",
      "text-warning-500": variant === "warning",
      "text-error-500": variant === "error",
      "text-primary": variant === "default",
    });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={clsx(
              "w-[90%] max-w-[400px] px-12 py-16",
              getVariantStyles(variant)
            )}
          >
            <div className="flex flex-col gap-16 w-full">
              <div className="flex flex-row items-start gap-8">
                {
                  <div className="flex items-center justify-center p-4 rounded-full bg-white border border-[#E5E6EB]">
                    {variant === "success" ? (
                      <BadgeCheck
                        className={getIconStyles("success")}
                        size={18}
                      />
                    ) : variant === "warning" ? (
                      <AlertTriangle
                        className={getIconStyles("warning")}
                        size={18}
                      />
                    ) : variant === "error" ? (
                      <CircleX className={getIconStyles("error")} size={18} />
                    ) : variant === "default" ? (
                      <Bell className={getIconStyles("default")} size={18} />
                    ) : null}
                  </div>
                }
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex justify-between items-start">
                    <h1
                      className={`text-md font-semibold line-clamp-1
                        ${variant === "default" ? "text-text" : "text-black"}
                        `}
                    >
                      {title}
                    </h1>
                    <button onClick={handleClose}>
                      <X
                        className={`text-black cursor-pointer ${
                          variant === "default" ? "text-text" : "text-black"
                        }`}
                        size={18}
                      />
                    </button>
                  </div>
                  <p
                    className={`text-black text-sm ${
                      variant === "default" ? "text-text" : "text-black"
                    }`}
                  >
                    {message}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-8">
                <Button text="No" type="base" onClick={handleClose} />
                <Button text="Yes" type="primary" onClick={handleConfirm} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
