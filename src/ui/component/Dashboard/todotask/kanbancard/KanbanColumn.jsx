import React from "react";
import classNames from "classnames";
import KanbanCardItem from "./KanbanCardItem";

const colorClasses = {
  red: {
    bg: "bg-red-bg",
    text: "text-red-text",
  },
  blue: {
    bg: "bg-blue-bg",
    text: "text-blue-text",
  },
  green: {
    bg: "bg-green-bg",
    text: "text-green-text",
  },
  gray: {
    bg: "bg-gray-bg",
    text: "text-gray-text",
  },
  // Add other colors as needed
};

export default function KanbanColumn({ column, onDragStart, onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const columnColors = colorClasses[column.color] || {};

  return (
    <div
      className="flex flex-col gap-8"
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div
        className={classNames(
          "px-12 py-8 flex flex-row justify-between items-center w-full rounded-main",
          columnColors.bg
        )}
      >
        <p className={classNames("text-sm", columnColors.text)}>
          {column.title}
        </p>
      </div>
      {column.items.map((task) => (
        <KanbanCardItem
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          columnId={column.id}
        />
      ))}
    </div>
  );
}