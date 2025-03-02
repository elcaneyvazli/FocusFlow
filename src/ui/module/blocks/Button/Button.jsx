"use client";
import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import Ripple from "./Ripple";

export default function Button({
  text,
  width,
  onClick,
  type = "primary",
  icon,
  size = "medium",
  iconPosition = "left",
  color,
  disabled,
}) {
  const { ripples, addRipple } = Ripple();

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    addRipple(e);
    onClick?.(e);
  };

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

    const buttonColorClass =
      (type === "primary" || type === "icon-primary") && color
        ? colorVariants[color]
        : colorVariants.primary;

    return clsx(
      "rounded-md whitespace-nowrap relative flex flex-row items-center justify-center gap-8 ease-in-out",
      {
        [`px-16 ${buttonColorClass} border text-white hover:outline hover:outline-2`]:
          type === "primary",
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
        "opacity-50 pointer-events-none select-none grayscale cursor-not-allowed hover:outline-none hover:border-border filter saturate-50 bg-opacity-75":
          disabled,
        "cursor-pointer": !disabled,
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
      className={clsx(getTypeClasses(), "overflow-hidden")}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      type="submit"
      onClick={handleClick}
      disabled={disabled}
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
        <span className={`flex items-center leading-none`}>{icon}</span>
      )}
      {text && (
        <p
          className={`text-sm whitespace-nowrap leading-none ${
            disabled ? "text-light" : ""
          }`}
        >
          {text}
        </p>
      )}
      {icon && iconPosition === "right" && (
        <span className={`flex items-center leading-none`}>{icon}</span>
      )}
      {!disabled && ripples}
    </motion.button>
  );
}
