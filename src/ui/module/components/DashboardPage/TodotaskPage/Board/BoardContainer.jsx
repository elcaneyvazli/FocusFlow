"use client";
import React, { useState, useCallback, useEffect } from "react";
import BoardColumn from "./BoardColumn";
import { useTasks, updateTaskPriority } from "@/services/task.services";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import BoardItem from "./BoardItem";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import { setIsDragging } from "@/redux/features/DragSlice/DragSlice";

export default function BoardContainer({
  columns,
  mutate,
  isLoading,
  isError,
}) {
  const dispatch = useDispatch();
  const [localColumns, setLocalColumns] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    if (columns && Array.isArray(columns)) {
      const filteredColumns = columns.map((column) => ({
        ...column,
        items: column.items?.filter((task) => !task.isCompleted) || [],
      }));
      setLocalColumns(filteredColumns);
    }
  }, [columns]);

  const handleDragStart = (event) => {
    const { active } = event;
    const activeColumn = localColumns.find((col) =>
      col.items.some((item) => item.id === active.id)
    );
    const activeItem = activeColumn?.items.find(
      (item) => item.id === active.id
    );
    setActiveTask(activeItem);
    dispatch(setIsDragging(true)); // Add this line
  };

  const handleDragEnd = useCallback(
    async (event) => {
      dispatch(setIsDragging(false)); // Add this line at the beginning
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      const sourceColumn = localColumns.find((col) =>
        col.items.some((item) => item.id === activeId)
      );
      const destinationColumn = localColumns.find((col) => col.id === overId);

      if (!sourceColumn || !destinationColumn) return;

      const taskToMove = sourceColumn.items.find(
        (item) => item.id === activeId
      );
      if (!taskToMove) return;

      const updatedColumns = localColumns.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            items: column.items.filter((item) => item.id !== activeId),
          };
        }
        if (column.id === destinationColumn.id) {
          return {
            ...column,
            items: [
              ...column.items,
              { ...taskToMove, priority: destinationColumn.id },
            ],
          };
        }
        return column;
      });

      setLocalColumns(updatedColumns);
      setActiveTask(null);

      try {
        await updateTaskPriority({
          taskId: activeId,
          priority: destinationColumn.id,
        });
        mutate();
        dispatch(
          addToast({
            id: Date.now(),
            title: "Success",
            message: "Task priority updated successfully",
            variant: "success",
          })
        );
      } catch (error) {
        console.error("Error updating task priority:", error);
        setLocalColumns(columns);
        dispatch(
          addToast({
            id: Date.now(),
            title: "Error",
            message: "Failed to update task priority",
            variant: "error",
          })
        );
      }
    },
    [localColumns, mutate, columns, dispatch]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Spinner />;
  if (!columns || !Array.isArray(columns)) return <div>No data available</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
        {localColumns?.map((column) => (
          <BoardColumn key={column.id} column={column} onMutate={mutate} />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="transform scale-105 opacity-90">
            <BoardItem task={activeTask} onMutate={mutate} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
