import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { useDispatch } from "react-redux";

export default function DarkModeButton() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    dispatch(setDarkMode(theme === "dark"));
  }, [theme, dispatch]);

  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    const themevalue = newTheme === "dark" ? true : false;
    dispatch(setDarkMode(themevalue));
  };

  const darkModeButtonReducer = useAppSelector(
    (state) => state.darkModeReducer.value.darkMode
  );
  
  return (
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 bg-input-bg border dark:border-dark-input-border dark:bg-dark-input-bg border-input-border rounded-main h-40"
    >
      {darkModeButtonReducer ? (
        <MoonIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      ) : (
        <SunIcon className="h-24 w-24 text-primary dark:text-input-bg" />
      )}
    </motion.button>
  );
}
