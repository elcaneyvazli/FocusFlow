import React, { useState } from "react";
import KanbanCardItem from "./MobileKanbanCardItem";
import EditTaskModul from "../modul/editTaskModul";
import { Draggable } from "react-beautiful-dnd";

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

export default function KanbanColumn({ column = {} }) {
  const { id, items, title } = column;
  const [editTask, setEditTask] = useState(null);

  const tasks = items?.filter((task) => task.isCompleted === false) || [];

  const columnColor =
    id === 0
      ? colorClasses.red
      : id === 1
      ? colorClasses.blue
      : id === 2
      ? colorClasses.green
      : id === 3
      ? colorClasses.gray
      : null;

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  }

  return (
    <div className="flex flex-col">
      <div
        className={`px-12 py-8 flex flex-row justify-between items-center w-full rounded-main ${columnColor?.bg} mb-[10px]`}
      >
        <p className={`text-sm ${columnColor?.text}`}>{title}</p>
      </div>
      <div className="flex flex-col gap-8">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={String(task.id)} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
              >
                <KanbanCardItem
                  task={task}
                  columnId={id}
                  setEditTask={setEditTask}
                />
              </div>
            )}
          </Draggable>
        ))}
      </div>

      {editTask && (
        <EditTaskModul
          task={editTask}
          edit={editTask !== null}
          setEdit={setEditTask}
        />
      )}
    </div>
  );
}
