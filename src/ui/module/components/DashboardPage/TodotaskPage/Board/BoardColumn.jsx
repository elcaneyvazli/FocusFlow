import React from "react";
import BoardItem from "./BoardItem";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
    <div className="flex flex-col h-full">
      <div
        className={`px-12 h-[36px] flex flex-row justify-between items-center w-full rounded-md ${columnColor.bg} mb-[10px]`}
      >
        <p className={`text-sm ${columnColor.text}`}>{title}</p>
        <span className="text-sm text-light">{items?.length || 0}</span>
      </div>
      <Droppable droppableId={String(id)} type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col flex-1 gap-8 p-4 transition-colors duration-200 min-h-[100px] rounded-md
              ${
                snapshot.isDraggingOver
                  ? "bg-elevation border-2 border-primary-200"
                  : "border-2 border-transparent"
              }`}
          >
            <AnimatePresence>
              {items?.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={getStyle(provided.draggableProps.style, snapshot)}
                      className={`${snapshot.isDragging ? "shadow-lg" : ""}`}
                    >
                      <BoardItem task={task} onMutate={onMutate} />
                    </motion.div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
