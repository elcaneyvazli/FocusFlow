import React, { useState } from "react";
import { motion } from "motion/react";
import { useDraggable } from "@dnd-kit/core";
import {
  Check as CheckIcon,
  Ellipsis as EllipsisHorizontalIcon,
  Clock as ClockIcon,
  Calendar as CalendarDaysIcon,
  Bookmark as BookmarkIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { updateTask, deleteTask } from "@/services/task.services";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { openDialog } from "@/redux/features/DialogSlice/DialogSlice";
import {
  toggleEditTask,
  addEditTask,
} from "@/redux/features/TaskSlice/TaskSlice";
import { useAppSelector } from "@/redux/store";

export default function BoardItem({ task, onMutate }) {
  const dispatch = useDispatch();
  const isDragging = useAppSelector((state) => state.drag.isDragging);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [editTask, setEditTaskState] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        touchAction: "none",
      }
    : { touchAction: "none" };

  const handleEditTask = () => {
    setEditTaskState(false);
    dispatch(addEditTask(task));
    dispatch(toggleEditTask());
  };

  const handleDeleteClick = () => {
    setEditTaskState(false);
    dispatch(
      openDialog({
        title: "Confirm Delete",
        message: "Are you sure you want to Delete Task?",
        variant: "warning",
        dialogType: "deleteTask",
        data: {
          taskId: task.id,
          onMutate,
        },
      })
    );
  };

  const handleToggleCompleted = async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };
      await updateTask({ taskId: task.id, updatedData: updatedTask });
      setIsCompleted(!isCompleted);
      onMutate();
      dispatch(
        addToast({
          id: Date.now(),
          title: "Success",
          message: `Task marked as ${
            !isCompleted ? "completed" : "incomplete"
          }`,
          variant: "success",
        })
      );
    } catch (error) {
      console.error("Error updating task:", error);
      dispatch(
        addToast({
          id: Date.now(),
          title: "Error",
          message: "Failed to update task status",
          variant: "error",
        })
      );
    }
  };

  const toggleMenu = () => {
    setEditTaskState(!editTask);
  };

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={{
          ...style,
          opacity: isDragging && !transform ? 0.4 : 1,
          pointerEvents: isDragging && !transform ? "none" : "auto",
        }}
        {...listeners}
        {...attributes}
        className="flex flex-col gap-16 cursor-pointer relative"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col gap-8 bg-elevation border border-border p-16 rounded-md z-10 relative">
          <div className="flex flex-col gap-0 cursor-pointer w-full h-full">
            <div className="flex flex-row justify-between items-center">
              <motion.div
                className={`flex items-center justify-center border border-input-border dark:border-0 h-[20px] w-[20px] rounded-full cursor-pointer ${
                  isCompleted ? "bg-primary-600" : "bg-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleCompleted}
              >
                {isCompleted && (
                  <CheckIcon className={"text-white"} size={12} />
                )}
              </motion.div>
              <div
                className="rounded-md hover:bg-background p-8"
                onClick={toggleMenu}
              >
                <EllipsisHorizontalIcon className="text-text" size={18} />
              </div>
            </div>
            <h1 className="text-md font-bold text-text max-w-full line-clamp-3">
              {task.title}
            </h1>
            <p className="text-xs text-light line-clamp-2">
              {task.description}
            </p>
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div className="flex flex-row gap-4 items-center">
              <ClockIcon className="text-text" size={14} />
              <p className="text-sm text-text">Activity</p>
            </div>
            <p className="text-sm text-text">-</p>
            <div
              className={`px-8 py-4 flex items-center justify-center border border-border rounded-md whitespace-nowrap ${
                task.status === 0
                  ? "bg-border"
                  : task.status === 1
                  ? "bg-primary-600 "
                  : task.status === 2
                  ? "bg-success-600"
                  : "border"
              }`}
            >
              <p
                className={`text-xs text-${
                  task.status === 0
                    ? "light"
                    : task.status === 1
                    ? "white"
                    : "white"
                }`}
              >
                {task.status == 0
                  ? "To do"
                  : task.status == 1
                  ? "In Progress"
                  : "Done"}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div className="flex flex-row gap-4 items-center">
              <CalendarDaysIcon className="text-text" size={14} />
              <p className="text-sm text-text">Date</p>
            </div>
            <p className="text-sm text-text">-</p>
            <p className="text-sm text-light">
              {new Date(task.dueDate).toLocaleDateString("en-UK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row gap-4 items-center">
              <BookmarkIcon className="text-text" size={14} />
              <p className="text-sm text-text">Label</p>
            </div>
            <p className="text-sm text-text">-</p>
            <div className="px-8 py-4 flex items-center justify-center border border-border bg-background rounded-md whitespace-nowrap">
              <p className="text-xs text-text">{task.label.toLowerCase()}</p>
            </div>
          </div>
          {editTask && (
            <div className="absolute top-40 right-40 flex flex-col bg-background rounded-md border border-border z-50 shadow-sm">
              <div
                className="flex flex-row gap-8 items-center py-12 pl-16 pr-80 border-b border-border"
                onClick={handleEditTask}
              >
                <PencilIcon className="h-[16px] w-[16px] text-text" />
                <h1 className="text-primary dark:text-white text-sm">Edit</h1>
              </div>
              <div
                className="flex flex-row gap-8 items-center py-12 pl-16 pr-80"
                onClick={handleDeleteClick}
              >
                <TrashIcon className="h-[16px] w-[16px] text-text" />
                <h1 className="text-primary dark:text-white text-sm">Delete</h1>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
