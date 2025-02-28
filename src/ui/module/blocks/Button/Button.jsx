"use client";
import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";

export default function Button({
  text,
  width,
  onClick,
  type = "primary",
  icon,
  size = "medium",
  iconPosition = "left",
  color,
}) {
  const getTypeClasses = () => {
    const isIconType = type.startsWith("icon");

    const colorVariants = {
      primary:
        "bg-gradient-to-b from-primary-600 to-primary-700 border-primary-400 hover:outline-primary-200",
      error:
        "bg-gradient-to-b from-error-600 to-error-700 border-error-400 hover:outline-error-200",
      success:
        "bg-gradient-to-b from-success-600 to-success-700 border-success-400 hover:outline-success-200",
      warning:
        "bg-gradient-to-b from-warning-600 to-warning-700 border-warning-400 hover:outline-warning-200",
    };

    const buttonColorClass = (type === "primary" || type === "icon-primary") && color
      ? colorVariants[color]
      : colorVariants.primary;

    return clsx(
      "rounded-md whitespace-nowrap relative flex flex-row items-center justify-center gap-8 cursor-pointer ease-in-out",
      {
        [`px-16 ${buttonColorClass} border text-white hover:outline hover:outline-2`]:
          type === "primary",
        "px-16 bg-elevation border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "base",
        "px-16 bg-background border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "solid",
        "px-16 bg-transparent border border-transparent text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "text",
        [`${buttonColorClass} border text-white hover:outline hover:outline-2`]:
          type === "icon-primary",
        "bg-elevation border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "icon-base",
        "px-16 bg-background border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "icon-solid",
        "bg-transparent border border-transparent text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "icon-text",
      },
      isIconType
        ? {
            "w-[32px] min-w-[32px] max-w-[32px]": size === "small",
            "w-[36px] min-w-[36px] max-w-[36px]": size === "medium",
            "w-[40px] min-w-[40px] max-w-[40px]": size === "large",
          }
        : width && `w-${width}`,
      {
        "h-[32px] min-h-[32px] max-h-[32px]": size === "small",
        "h-[36px] min-h-[36px] max-h-[36px]": size === "medium",
        "h-[40px] min-h-[40px] max-h-[40px]": size === "large",
      }
    );
  };

  return (
    <motion.button
      className={getTypeClasses()}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={onClick}
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center leading-none">{icon}</span>
      )}
      {text && (
        <p className={`text-sm whitespace-nowrap leading-none`}>{text}</p>
      )}
      {icon && iconPosition === "right" && (
        <span className="flex items-center leading-none">{icon}</span>
      )}
    </motion.button>
  );
}
