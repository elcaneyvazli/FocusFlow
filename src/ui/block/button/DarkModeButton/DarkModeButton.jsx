"use client";
import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function DarkModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <motion.button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 bg-input-bg border dark:border-dark-input-border dark:bg-dark-input-bg border-input-border rounded-main h-40"
    >
      {currentTheme == "dark" ? (
        <MoonIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      ) : (
        <SunIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      )}
    </motion.button>
  );
}
