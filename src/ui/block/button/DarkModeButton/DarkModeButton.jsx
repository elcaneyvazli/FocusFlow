import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { EllipsisIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  toggleDarkMode,
  initializeDarkMode,
} from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { useAppSelector } from "@/redux/store";

export default function DarkModeButton() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(initializeDarkMode());
    setMounted(true);
  }, [dispatch]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  if (!mounted) {
    return (
      <motion.div className="h-40 w-40 flex items-center justify-center bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border animate-pulse rounded-main">
        <EllipsisIcon className="h-24 w-24 text-light animate-pulse" />
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-40 w-40 flex items-center justify-center bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main"
    >
      {isDarkMode ? (
        <MoonIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      ) : (
        <SunIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      )}
    </motion.button>
  );
}
