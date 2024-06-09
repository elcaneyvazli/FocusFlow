import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { TaskData } from "@/library/taskdata";
import { getTasks } from "@/services/task/task.services";

export default function KanbanBoard() {
  const [columns, setColumns] = useState(TaskData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setColumns(response.tasks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDragStart = (e, taskId, sourceColumnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  const handleDrop = (e, targetColumnId) => {
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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          column={column}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
