import KanbanColumn from "./KanbanColumn";
import { updateTask } from "@/services/task/task.services";

export default function KanbanBoard({ columns, setColumns, edit }) {
  const handleDragStart = (e, taskId, sourceColumnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  const handleDrop = async (e, targetColumnId) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

    if (sourceColumnId === targetColumnId) return;

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(
      (column) => column.id === parseInt(sourceColumnId)
    );
    const targetColumn = newColumns.find(
      (column) => column.id === parseInt(targetColumnId)
    );
    const task = sourceColumn.items.find(
      (item) => item.id === parseInt(taskId)
    );

    sourceColumn.items = sourceColumn.items.filter(
      (item) => item.id !== parseInt(taskId)
    );
    targetColumn.items.push(task);

    setColumns(newColumns);

    task.taskPriority = targetColumn.id;

    try {
      await updateTask(taskId, task);
      router.refresh();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        {columns?.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </>
  );
}
