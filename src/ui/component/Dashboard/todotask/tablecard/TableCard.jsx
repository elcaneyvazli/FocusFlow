import React, { useState, useEffect } from "react";
import TableCardHeader from "./TableCardHeader";
import TableCardItem from "./TableCardItem";
import EditTaskModul from "@/ui/component/Dashboard/todotask/modul/editTaskModul";
import NewTable from "./NewTable";

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
    <div className="">
      <NewTable data={data} onEditTask={handleEditTask} />

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
