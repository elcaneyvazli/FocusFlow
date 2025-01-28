"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Spinner({ size }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="border-4 border-border border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        style={{ 
          width: size || 36,
          height: size || 36,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
