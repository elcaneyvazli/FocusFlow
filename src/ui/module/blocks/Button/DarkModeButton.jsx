"use client";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import {
  toggleDarkMode,
  initializeDarkMode,
} from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { useAppSelector } from "@/redux/store";
import { EllipsisVertical, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";

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
      <motion.div className="min-w-full w-full max-w-full h-[36px] flex items-center justify-center animate-pulse rounded-main">
        <EllipsisVertical
          className="text-light animate-pulse"
          strokeWidth={1}
          size={20}
        />
      </motion.div>
    );
  }

  return (
    <Button
      size="medium"
      type="icon-base"
      icon={
        isDarkMode ? (
          <Moon
            className="h-[18px] w-[18px] text-text"
            strokeWidth={2}
            size={18}
          />
        ) : (
          <Sun
            className="h-[18px] w-[18px] text-text"
            strokeWidth={2}
            size={18}
          />
        )
      }
      onClick={toggleTheme}
    />
  );
}
