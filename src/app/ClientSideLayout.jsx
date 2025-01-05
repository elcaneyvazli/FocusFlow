"use client";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ClientSideLayout({ children }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    dispatch(initializeDarkMode());
    setMounted(true);
  }, [dispatch]);

  if (!mounted) {
    return null;
  }

  return (
    <body className={`${dmSans.className} bg-background`}>
      {children}
    </body>
  );
} 