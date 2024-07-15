// import { useRouter } from "next/navigation";
// import KanbanColumn from "./KanbanColumn";
// import { updateTask } from "@/services/task/task.services";

// export default function KanbanBoard({ columns, setColumns, edit }) {
//   const router = useRouter();

//   const handleDragStart = (e, taskId, sourceColumnId, task) => {
//     e.dataTransfer.setData("taskId", taskId);
//     e.dataTransfer.setData("sourceColumnId", sourceColumnId);
//     e.dataTransfer.setData("task", task);
//     console.log("Task ID:", taskId);
//     console.log("Source Column ID:", sourceColumnId);
//     console.log("Task:", task);
//   };

//   const handleDrop = async (e, targetColumnId) => {
//     const taskId = e.dataTransfer.getData("taskId");
//     const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

//     if (sourceColumnId === targetColumnId) return;

//     const newColumns = [...columns];
//     const sourceColumn = newColumns.find(
//       (column) => column.id === parseInt(sourceColumnId)
//     );
//     const targetColumn = newColumns.find(
//       (column) => column.id === parseInt(targetColumnId)
//     );
//     const task = sourceColumn.items.find(
//       (item) => item.id === parseInt(taskId)
//     );

//     sourceColumn.items = sourceColumn.items.filter(
//       (item) => item.id !== parseInt(taskId)
//     );
//     targetColumn.items.push(task);

//     setColumns(newColumns);

//     console.log("Task ID:", newColumns);

//     task.priority = targetColumn.id;

//     try {
//       await updateTask(taskId, task);
//       router.refresh();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
//         {columns?.map((column) => (
//           <KanbanColumn
//             key={column.id}
//             id={column.id}
//             column={column}
//             onDragStart={handleDragStart}
//             onDrop={handleDrop}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import KanbanColumn from "./KanbanColumn";
// import { updateTask } from "@/services/task/task.services";

// export default function KanbanBoard({ columns, setColumns, edit }) {
//   console.log("Columns:", columns);
//   const onDragEnd = async (result) => {
//     const { source, destination } = result;

//     // If the item is dropped outside a column
//     if (!destination) return;

//     // If the item is dropped in the same column
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     const sourceColumn = columns.find(
//       (column) => column.id === parseInt(source.droppableId)
//     );
//     const targetColumn = columns.find(
//       (column) => column.id === parseInt(destination.droppableId)
//     );
//     const [movedTask] = sourceColumn.items.splice(source.index, 1);
//     targetColumn.items.splice(destination.index, 0, movedTask);

//     setColumns([...columns]);

//     movedTask.priority = targetColumn.id;

//     try {
//       await updateTask(movedTask.id, movedTask);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
//         {columns?.map((column) => (
//           <Droppable droppableId={String(column.id)} key={column.id}>
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="flex flex-col gap-8"
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


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import { updateTask } from "@/services/task/task.services";

export default function KanbanBoard({ columns, setColumns, edit }) {
  console.log("Columns:", columns);
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns.find(
      (column) => column.id === parseInt(source.droppableId)
    );
    const targetColumn = columns.find(
      (column) => column.id === parseInt(destination.droppableId)
    );
    const [movedTask] = sourceColumn.items.splice(source.index, 1);
    targetColumn.items.splice(destination.index, 0, movedTask);

    setColumns([...columns]);

    movedTask.priority = targetColumn.id;

    try {
      await updateTask(movedTask.id, movedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
        {columns?.map((column) => (
          <Droppable droppableId={String(column.id)} key={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-8"
              >
                <KanbanColumn column={column} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}