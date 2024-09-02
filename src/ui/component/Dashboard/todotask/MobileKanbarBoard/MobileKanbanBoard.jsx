import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateTaskPriority } from "@/redux/features/TaskSlice/TaskSlice";
import { useCallback } from "react";
import MobileKanbanColumn from "./MobileKanbanColumn";

export default function MobileKanbanBoard({ columns, setColumns }) {
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result) => {
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

      const updatedTask = { id: movedTask.id, priority: destinationColumn.id };

      try {
        dispatch(
          updateTaskPriority({
            taskId: updatedTask.id,
            priority: updatedTask.priority,
          })
        );
      } catch (error) {
        console.error("Error updating task priority:", error);
      }
    },
    [columns, setColumns, dispatch]
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
