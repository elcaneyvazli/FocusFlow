"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        className="w-[36px] h-[36px] border-4 border-border border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
