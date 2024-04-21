"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import {toggleTask} from "@/redux/features/NewTaskSlice/newTaskSlice";

export default function NewTaskButton() {
  const dispatch = useDispatch();
  

  return (
    <motion.button
      className="bg-primary opacity-100 hover:opacity-95 text-bg text-sm font-bold rounded-[10px] px-32 py-8 relative overflow-hidden sm:w-fit w-full"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTask())} 
    >
      <Link href="/dashboard">
        <p className="text-white text-sm font-medium">New Task</p>
      </Link>
    </motion.button>
  );
}
