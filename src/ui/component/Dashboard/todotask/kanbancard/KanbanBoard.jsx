import { useRouter } from "next/navigation";
import KanbanColumn from "./KanbanColumn";
import { updateTask } from "@/services/task/task.services";

export default function KanbanBoard({ columns, setColumns, edit }) {
  const router = useRouter();

  const handleDragStart = (e, taskId, sourceColumnId, task) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    const task = JSON.parse(e.dataTransfer.getData("task"));

    if (sourceColumnId === targetColumnId) return;

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(
      (column) => column.id === parseInt(sourceColumnId)
    );
    const targetColumn = newColumns.find(
      (column) => column.id === parseInt(targetColumnId)
    );

    sourceColumn.items = sourceColumn.items.filter(
      (item) => item.id !== parseInt(taskId)
    );

    targetColumn.items.push(task);

    setColumns(newColumns);

    task.priority = targetColumn.id;

    try {
      await updateTask(taskId, task);
      router.refresh();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
      {columns?.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onDragStart={handleDragStart}
          onDrop={(e) => handleDrop(e, column.id)}
          onDragOver={handleDragOver}
        />
      ))}
    </div>
  );
}
