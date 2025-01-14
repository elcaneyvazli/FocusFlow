"use client";
import React from "react";
import Image from "next/image";
import LogoImage from "@/ui/assets/Logo.svg";
import { motion } from "motion/react";

export default function Logo({ size, text, textSize }) {
  return (
    <motion.div
      className="flex flex-row items-center gap-12"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <Image
        src={LogoImage}
        alt="logo"
        width={size}
        height={size}
        className="border border-border rounded-md"
      />
      <h1 className={`font-semibold text-text ${textSize ? `text-xl` : ""}`}>
        {text}
      </h1>
    </motion.div>
  );
}
