"use client";
import { useAppSelector } from "@/redux/store";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import NewTaskForm from "./NewTaskForm";
import { setToggleProject } from "@/redux/features/ProjectSlice/ProjectSlice";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";

export default function NewProjectTask({
  groupId,
  projectId,
  projectUsers,
  mutate,
}) {
  const dispatch = useDispatch();
  const projectValue = useAppSelector((state) => state.project.newProject);

  React.useEffect(() => {
    if (!groupId || !projectId) {
      console.error("NewProjectTask - Missing IDs:", { groupId, projectId });
      dispatch(
        addToast({
          title: "Error",
          message: "Missing required group or project ID",
          variant: "error",
        })
      );
      dispatch(setToggleProject()); // Close the modal
    }
  }, [groupId, projectId, dispatch]);

  // Don't render if IDs are missing
  if (!groupId || !projectId) return null;

  const onClose = () => {
    dispatch(setToggleProject());
    if (typeof mutate === "function") {
      mutate();
    }
  };

  return projectValue ? (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <NewTaskForm
        onClose={onClose}
        groupId={groupId}
        projectId={projectId}
        projectUsers={projectUsers}
        mutate={mutate}
      />
    </div>
  ) : null;
}
