"use client";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { DM_Sans } from "next/font/google";
import { useAppSelector } from "@/redux/store";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ClientSideLayout({ children }) {
  const dispatch = useDispatch();
  const darkMode = useAppSelector((state) => state.darkMode?.darkMode);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    dispatch(initializeDarkMode());
    setMounted(true);
  }, [dispatch]);

  if (!mounted) {
    return null;
  }

  return (
    <body
      className={`${dmSans.className} bg-background ${
        darkMode ? "dark" : "light"
      }`}
    >
      {children}
    </body>
  );
}
