import React from "react";
import BoardItem from "./BoardItem";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "motion/react";

const colorClasses = {
  Red: {
    bg: "bg-error-100",
    text: "text-error-600",
  },
  Blue: {
    bg: "bg-primary-100",
    text: "text-primary-600",
  },
  Green: {
    bg: "bg-success-100",
    text: "text-success-600",
  },
  Grey: {
    bg: "bg-border",
    text: "text-light",
  },
};

export default function BoardColumn({ column, onMutate }) {
  const { id, items, title, color } = column;
  const columnColor = colorClasses[color] || colorClasses.Grey;

  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col h-full">
      <div
        className={`px-12 h-[36px] flex flex-row justify-between items-center w-full rounded-md ${columnColor.bg} mb-[10px]`}
      >
        <p className={`text-sm ${columnColor.text}`}>{title}</p>
        <span className="text-sm text-light">{items?.length || 0}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col flex-1 gap-8 p-4 transition-colors duration-200 min-h-[100px] rounded-md
          ${
            isOver
              ? "bg-elevation border-2 border-primary-400"
              : "border-2 border-transparent"
          }`}
      >
        <AnimatePresence mode="popLayout">
          {items?.map((task) => (
            <BoardItem key={task.id} task={task} onMutate={onMutate} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
