"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Button({ text}) {
  return (
      <motion.button
        className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border hover:bg-primary hover:dark:opacity-85 text-black dark:text-white hover:text-white px-32 py-8 rounded-main hover:opacity-95 w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
      >
        <p className="text-sm">{text}</p>
      </motion.button>
  );
}
