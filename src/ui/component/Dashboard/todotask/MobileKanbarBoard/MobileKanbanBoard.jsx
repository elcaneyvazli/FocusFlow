// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import KanbanColumn from "./MobileKanbanColumn";
// import { updateTask } from "@/services/task/task.services";
// import { useCallback } from "react";

// export default function KanbanBoard({ columns, setColumns }) {
//   const onDragEnd = useCallback(
//     async (result) => {
//       const { source, destination } = result;

//       if (!destination) return;

//       if (
//         source.droppableId === destination.droppableId &&
//         source.index === destination.index
//       ) {
//         return;
//       }

//       const sourceColumn = columns.find(
//         (column) => column.id === parseInt(source.droppableId)
//       );
//       const targetColumn = columns.find(
//         (column) => column.id === parseInt(destination.droppableId)
//       );
//       const [movedTask] = sourceColumn.items.splice(source.index, 1);
//       targetColumn.items.splice(destination.index, 0, movedTask);

//       setColumns([...columns]);

//       const updatedTask = { ...movedTask, priority: targetColumn.id };

//       try {
//         await updateTask(updatedTask.id, updatedTask);
//       } catch (error) {
//         console.error("Error updating task:", error);
//       }
//     },
//     [columns, setColumns]
//   );

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
//         {columns?.map((column) => (
//           <Droppable droppableId={String(column.id)} key={column.id}>
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className={`flex flex-col gap-8 ${
//                   snapshot.isDraggingOver ? "bg-input-bg dark:bg-dark-input-bg opacity-80 rounded-main border border-input-border dark:border-dark-input-border" : ""
//                 }`}
//               >
//                 <KanbanColumn column={column} />
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// }

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
      const [movedTask] = sourceColumn.items.splice(source.index, 1);
      destinationColumn.items.splice(destination.index, 0, movedTask);

      setColumns([...columns]);

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
