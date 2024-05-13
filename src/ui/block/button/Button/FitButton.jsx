"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FitButton({ text, link }) {
  return (
    <Link href={link} className="w-full">
      <motion.button
        className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border hover:bg-primary hover:dark:opacity-85 w-fit text-black dark:text-white hover:text-white px-32 py-8 rounded-main hover:opacity-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-sm">{text}</p>
      </motion.button>
    </Link>
  );
}
