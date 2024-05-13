"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import google from "@/ui/assert/google.png";

export default function AuthorizeButton() {
  return (
    <motion.button
      className="border border-input-border dark:border-dark-input-border  bg-input-bg dark:bg-dark-input-bg px-8 py-12 w-full flex flex-row items-center justify-center gap-8 rounded-[10px] overflow-hidden relative text-primary text-sm font-bold "
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image src={google} alt="logo" width={20} height={20} />
      <p className="text-primary dark:text-input-bg text-sm font-normal">Authorize with Google</p>
    </motion.button>
  );
}
