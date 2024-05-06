"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrimaryButton({ text, link }) {
  return (
    <motion.button
      className="hover:bg-primary bg-input-bg border border-input-border opacity-100 hover:opacity-95 rounded-main px-32 py-8 text-black hover:text-white"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={link}>
        <p className=" text-sm font-medium">{text}</p>
      </Link>
    </motion.button>
  );
}
