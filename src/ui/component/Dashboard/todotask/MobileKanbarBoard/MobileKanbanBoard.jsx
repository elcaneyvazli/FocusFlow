import { DragDropContext } from "react-beautiful-dnd";
import { updateTask } from "@/services/task/task.services";
import { useCallback } from "react";
import MobileKanbanColumn from "./MobileKanbanColumn";

export default function MobileKanbanBoard({ columns, setColumns }) {
  const onDragEnd = useCallback(
    async (result) => {
      const { source, destination } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceColumnIndex = columns.findIndex(
        (column) => column.id === parseInt(source.droppableId)
      );
      const destinationColumnIndex = columns.findIndex(
        (column) => column.id === parseInt(destination.droppableId)
      );

      const sourceColumn = columns[sourceColumnIndex];
      const destinationColumn = columns[destinationColumnIndex];

      const sourceItems = Array.from(sourceColumn.items);
      const destinationItems =
        sourceColumn === destinationColumn
          ? sourceItems
          : Array.from(destinationColumn.items);

      const [movedTask] = sourceItems.splice(source.index, 1);

      destinationItems.splice(destination.index, 0, movedTask);

      const updatedColumns = columns.map((column) => {
        if (column.id === sourceColumn.id) {
          return { ...column, items: sourceItems };
        } else if (column.id === destinationColumn.id) {
          return { ...column, items: destinationItems };
        }
        return column;
      });

      setColumns(updatedColumns);

      const updatedTask = { ...movedTask, priority: destinationColumn.id };

      try {
        await updateTask(updatedTask.id, updatedTask);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    [columns, setColumns]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
        {columns?.map((column) => (
          <MobileKanbanColumn column={column} key={column.id} />
        ))}
      </div>
    </DragDropContext>
  );
}
