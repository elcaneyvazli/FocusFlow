"use client";
import { useLayoutEffect, useState } from "react";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import MetadataLayout from "./MetadataLayout";
import { useDispatch } from "react-redux";
import { initializeDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  return (
    <MetadataLayout>
      <ReduxProvider>
        <InnerLayout>{children}</InnerLayout>
      </ReduxProvider>
    </MetadataLayout>
  );
}

function InnerLayout({ children }) {
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
    <body
      className={`${dmSans.className} bg-background`}
      style={{ overflow: "auto" }}
    >
      {children}
    </body>
  );
}
