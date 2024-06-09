"use client";

import LandingPage from "@/ui/component/Landing/LandingPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      const darkValue = localStorage.getItem("theme");
      dispatch(setDarkMode(darkValue === "dark"));
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
  return <LandingPage />;
}
