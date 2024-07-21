import React from "react";
import KanbanAiItem from "./KanbanAiItem";

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
};

export default function KanbanAiColumn({ column }) {
  const tasks = column.items.filter((task) => task.isCompleted === false);

  const columnColor =
    column.id === 0
      ? colorClasses.red
      : column.id === 1
      ? colorClasses.blue
      : column.id === 2
      ? colorClasses.green
      : column.id === 3
      ? colorClasses.gray
      : null;

  return (
    <div className="flex flex-col gap-8">
      <div
        className={`px-12 py-8 flex flex-row justify-between items-center w-full rounded-main ${columnColor.bg}`}
      >
        <p className={`text-sm ${columnColor.text}`}>{column.title}</p>
      </div>
      {tasks.map((task) => (
        <KanbanAiItem key={task.id} task={task} />
      ))}
    </div>
  );
}