"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PrimaryButton({
  text,
  color,
  width,
  onClick,
  variant = "primary",
  icon,
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg px-32 py-8 h-40 w-${width}`;
      case "secondary":
        return `bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg px-32 py-8 h-40 w-${width}`;
      case "icon-primary":
        return "bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg flex flex-row items-center justify-center w-40 h-40 min-w-40 min-h-40 max-w-40 max-h-40";
      case "icon-secondary":
        return "bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg flex flex-row items-center justify-center w-40 h-40 min-w-40 min-h-40 max-w-40 max-h-40";
      default:
        return color
          ? `bg-${color}-bg text-${color}-text px-32 py-8`
          : "bg-input-bg dark:bg-dark-input-bg hover:bg-primary hover:dark:opacity-85 hover:text-white text-black dark:text-white px-32 py-8";
    }
  };

  return (
    <motion.button
      className={`${getVariantClasses()} rounded-main hover:opacity-90 whitespace-nowrap`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={onClick}
    >
      {icon && icon}
      {text && <p className="text-sm">{text}</p>}
    </motion.button>
  );
}
