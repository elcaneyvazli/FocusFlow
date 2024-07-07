"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FitButton({ text, link, color }) {
  return (
    <Link href={link ? link : ""} className="w-fit">
      <motion.button
        className={`${
          color ? `bg-${color}-bg` : "bg-input-bg dark:bg-dark-input-bg"
        } border border-input-border dark:border-dark-input-border ${
          color ? "" : "hover:bg-primary hover:dark:opacity-85 hover:text-white"
        }   w-fit ${
          color ? `text-${color}-text` : "text-black dark:text-white"
        }   px-32 py-8 rounded-main hover:opacity-90`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-sm w-full flex flex-row">{text}</p>
      </motion.button>
    </Link>
  );
}
