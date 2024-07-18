import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import { motion } from "framer-motion";

export default function AiButton() {
  return (
    <motion.button
      className="flex flex-row items-center justify-center gap-8 bg-[#403650] 
        dark:bg-gradient-to-t from-[#403650] to-[#1d1d1d] hover:opacity-80
      border border-input-border dark:border-dark-input-border px-16 rounded-main h-[40px]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <SparklesIcon className="w-[20px] h-[20px] text-input-bg" />
      <h1 className="text-lg text-input-bg">Ask AI</h1>
    </motion.button>
  );
}
