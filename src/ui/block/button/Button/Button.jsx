"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Button({ text, link }) {
  return (
    <Link href={link} className="w-full">
      <motion.button
        className="bg-input-bg border border-input-border hover:bg-primary w-full text-black hover:text-white px-32 py-8 rounded-main hover:opacity-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-sm">{text}</p>
      </motion.button>
    </Link>
  );
}
