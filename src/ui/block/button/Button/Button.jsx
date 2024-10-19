"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Button({ text, color, width, onClick }) {
  return (
    <motion.button
      className={`${
        color
          ? `bg-${color}-bg text-${color}-text`
          : "bg-input-bg dark:bg-dark-input-bg hover:bg-primary hover:dark:opacity-85 hover:text-white text-black dark:text-white"
      } h-40 px-32 py-8 rounded-main hover:opacity-90 border border-input-border dark:border-dark-input-border w-${width} whitespace-nowrap	`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={onClick}
    >
      <p className="text-sm">{text}</p>
    </motion.button>
  );
}
