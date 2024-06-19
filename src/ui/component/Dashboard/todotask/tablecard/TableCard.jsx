import React, { useState, useEffect } from "react";
import TableCardHeader from "./TableCardHeader";
import TableCardItem from "./TableCardItem";
import EditTaskModul from "@/ui/component/Dashboard/todotask/modul/editTaskModul";

export default function TableCard({ data, loading, error }) {
  const [editTask, setEditTask] = useState(null);

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleCloseEditTask = () => {
    setEditTask(null);
  };

  useEffect(() => {
    if (editTask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editTask]);

  return (
    <div className="flex flex-col gap-0 border border-input-border dark:border-dark-input-border rounded-main w-full bg-white dark:bg-dark-input-bg z-10 overflow-y-scroll overflow-x-scroll">
      <TableCardHeader />
      <TableCardItem
        className="w-full"
        data={data}
        onEditTask={handleEditTask}
      />

      {editTask && (
        <EditTaskModul
          task={editTask}
          edit={editTask !== null}
          setEdit={handleCloseEditTask}
        />
      )}
    </div>
  );
}
