"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleSidebar } from "@/redux/features/SidebarButtonSlice/SidebarButtonSlice";

export default function SidebarToggleButton() {
  const dispatch = useDispatch();
  const sidebarButtonReducer = useAppSelector(
    (state) => state.sidebarButtonReducer.value.sidebarButton
  );

  console.log(sidebarButtonReducer)

  const toggleSidebarButton = () => {
    dispatch(toggleSidebar());
  };
  return (
    <motion.button
      className="border border-input-border dark:border-dark-input-border dark:bg-dark-input-bg bg-input-bg p-8 rounded-main block xl:hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleSidebarButton}
    >
      <Bars3Icon className="h-24 w-24 text-primary dark:text-input-bg" />
    </motion.button>
  );
}
