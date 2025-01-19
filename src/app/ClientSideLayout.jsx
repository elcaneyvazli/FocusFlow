"use client";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { useAppSelector } from "@/redux/store";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "4500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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
      className={`bg-elevation ${darkMode ? "dark" : "light"} ${
        satoshi.className
      }`}
    >
      {children}
    </body>
  );
}
