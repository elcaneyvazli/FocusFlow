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
}) {
  const getTypeClasses = () => {
    const isIconType = type.startsWith("icon");
    return clsx(
      [
        `rounded-md whitespace-nowrap relative flex flex-row items-center justify-center gap-8 cursor-pointer ease-in-out`,
      ],
      {
        "px-16 bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white  hover:outline hover:outline-2 hover:outline-primary-200":
          type === "primary",
        "px-16 bg-elevation border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "base",
        "px-16 bg-background border border-border text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "solid",
        "px-16 bg-transparent border border-transparent text-text hover:outline hover:outline-2 hover:outline-primary-200 hover:border-primary-600":
          type === "text",
        "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white  hover:outline hover:outline-2 hover:outline-primary-200":
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
            "w-[32px]": size === "small",
            "w-[36px]": size === "medium",
            "w-[40px]": size === "large",
          }
        : width && `w-${width}`,
      {
        "h-[32px]": size === "small",
        "h-[36px]": size === "medium",
        "h-[40px]": size === "large",
      }
    );
  };

  return (
    <motion.button
      className={getTypeClasses()}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={onClick}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text && <p className={`text-sm whitespace-nowrap`}>{text}</p>}
    </motion.button>
  );
}
