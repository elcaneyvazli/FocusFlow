"use client";
import LandingPage from "@/ui/component/Landing/LandingPage";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {

  return <LandingPage />;
}
