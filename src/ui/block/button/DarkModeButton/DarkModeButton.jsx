import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import useDarkTheme from "@/utils/useDarkTheme";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (localTheme === "dark" || (!localTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      setIsDarkMode(false);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      setIsDarkMode(false);
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 bg-input-bg border dark:border-dark-input-border dark:bg-dark-input-bg border-input-border rounded-main h-40"
    >
      {isDarkMode ? (
        <MoonIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      ) : (
        <SunIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      )}
    </motion.button>
  );
}
