"use client";
import React, { useState, useCallback, useEffect } from "react";
import BoardColumn from "./BoardColumn";
import { useTasks, updateTaskPriority } from "@/services/task.services";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BoardContainer() {
  const { columns, isLoading, isError, mutate } = useTasks();
  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    if (columns) {
      setLocalColumns(columns);
    }
  }, [columns]);

  const reorderColumns = useCallback((source, destination, draggableId) => {
    const sourceCol = localColumns.find(col => String(col.id) === source.droppableId);
    const destCol = localColumns.find(col => String(col.id) === destination.droppableId);
    
    if (!sourceCol || !destCol) return localColumns;

    const sourceItems = Array.from(sourceCol.items);
    const [movedItem] = sourceItems.splice(source.index, 1);
    
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      return localColumns.map(col =>
        String(col.id) === source.droppableId
          ? { ...col, items: sourceItems }
          : col
      );
    }

    const destItems = Array.from(destCol.items);
    destItems.splice(destination.index, 0, movedItem);
    
    return localColumns.map(col => {
      if (String(col.id) === source.droppableId) return { ...col, items: sourceItems };
      if (String(col.id) === destination.droppableId) return { ...col, items: destItems };
      return col;
    });
  }, [localColumns]);

  const handleDragEnd = useCallback(async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }

    try {
      // Optimistic update
      setLocalColumns(prev => reorderColumns(source, destination, draggableId));

      await updateTaskPriority({
        taskId: parseInt(draggableId),
        priority: parseInt(destination.droppableId)
      });

      // Refresh data to ensure sync
      mutate();
    } catch (error) {
      console.error("Error updating task priority:", error);
      // Revert to server state on error
      setLocalColumns(columns);
    }
  }, [columns, mutate, reorderColumns]);

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading...</div>;
  if (isError) return <div className="text-error-600">Error loading tasks</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
        {localColumns?.map((column) => (
          <BoardColumn 
            key={column.id} 
            column={column} 
            onMutate={mutate} 
          />
        ))}
      </div>
    </DragDropContext>
  );
}

