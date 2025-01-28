"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { setToggleProject } from "@/redux/features/GroupSlice/GroupSlice";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import NewProjectForm from "./NewProjectForm";

export default function NewProjectModal() {
  const dispath = useDispatch();
  const NewProject = useAppSelector((state) => state.group.newProject);

  return NewProject ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
        onClick={() => dispath(setToggleProject())}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <NewProjectForm onClick={() => dispath(setToggleProject())} />
    </div>
  ) : null;
}
