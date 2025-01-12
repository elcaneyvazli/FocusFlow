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

export default function BoardItem({ task, onMutate }) {
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [editTask, setEditTaskState] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleEditTask = () => {
    setEditTaskState(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onMutate();
      dispatch(
        addToast({
          id: Date.now(),
          title: "Success",
          message: "Task deleted successfully",
          variant: "success",
        })
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      dispatch(
        addToast({
          id: Date.now(),
          title: "Error",
          message: "Failed to delete task",
          variant: "error",
        })
      );
    }
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
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col gap-16 cursor-pointer relative"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col gap-8 bg-elevation border border-border p-16 rounded-md z-10 relative">
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
              <CheckIcon className="h-[12px] w-[12px] text-white" />
            )}
          </motion.div>
          <div
            className="rounded-md hover:bg-background p-8"
            onClick={toggleMenu}
          >
            <EllipsisHorizontalIcon className="h-[18px] w-[18px] text-text" />
          </div>
        </div>
        <div className="flex flex-col gap-0 cursor-pointer w-full h-full">
          <h1 className="text-md font-bold text-text max-w-full line-clamp-3">
            {task.title}
          </h1>
          <p className="text-xs text-light line-clamp-1">{task.description}</p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <ClockIcon className="h-[16px] w-[16px] text-text" />
            <p className="text-sm text-text">Activity</p>
          </div>
          <p className="text-sm text-text">-</p>
          <div
            className={`px-8 py-4 flex items-center justify-center border border-border rounded-md whitespace-nowrap bg-${
              task.status === 0
                ? "border"
                : task.status === 1
                ? "primary-600"
                : "success-600"
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
          <div className="flex flex-row gap-2 items-center">
            <CalendarDaysIcon className="h-[16px] w-[16px] text-text" />
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
          <div className="flex flex-row gap-2 items-center">
            <BookmarkIcon className="h-[16px] w-[16px] text-text" />
            <p className="text-sm text-text">Label</p>
          </div>
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
              onClick={handleDelete}
            >
              <TrashIcon className="h-[16px] w-[16px] text-text" />
              <h1 className="text-primary dark:text-white text-sm">Delete</h1>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
