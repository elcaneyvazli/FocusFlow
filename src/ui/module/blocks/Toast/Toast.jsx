import { removeToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useAppSelector } from "@/redux/store";
import { AlertTriangle, X, BadgeCheck, CircleX } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);
  const [prevToastCount, setPrevToastCount] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio("/audio2.mp3");

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (toasts.length > prevToastCount && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.warn("Toast notification sound couldn't be played:", error);
      });
    }

    setPrevToastCount(toasts.length);

    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 5000)
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
    <div
      className="fixed bottom-0 sm:bottom-32 right-0 sm:right-32 flex flex-col items-end z-[999] sm:w-fit w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {[...toasts].reverse().map((toast, index) => (
        <div
          key={toast.id || Date.now().toString()} // Ensure key exists
          className={clsx(
            "relative min-w-full sm:w-[344px] h-fit px-8 py-8 flex flex-row justify-between items-start gap-8",
            getVariantStyles(toast.variant)
          )}
          style={{
            position: "absolute",
            bottom: isHovered ? `${index * 80}px` : `${index * 8}px`,
            zIndex: toasts.length - index,
            opacity: isHovered ? 1 : Math.max(0.2, 1 - index * 0.1),
            transformOrigin: "bottom center",
            transform: isHovered
              ? " "
              : `translateY(${
                  index === 0 ? "0px" : `-${index + 8}px`
                })  scale(${index === 0 ? 1 : Math.max(0.2, 1 - index * 0.1)})`,
            transition: `
                transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)
              `,
          }}
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
          <div className="flex flex-col gap-0 w-full max-w-full">
            <h1 className="text-black text-md font-semibold line-clamp-1 w-full">
              {toast.title || "Task"}
            </h1>
            <p className="text-black text-sm">{toast.message}</p>
          </div>
          <X
            className="h-[18px] w-[18px] min-w-[18px] min-h-[18px] text-black cursor-pointer"
            size={18}
            onClick={() => handleClose(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
