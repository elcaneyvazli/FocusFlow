import React from "react";
import KanbanAiColumn from "./KanbanAiColumn";

export default function KanbanAiBoard({ columns }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32 overflow-x-scroll max-h-full">
      {columns?.map((column) => (
        <KanbanAiColumn key={column.id} column={column} />
      ))}
    </div>
  );
}
