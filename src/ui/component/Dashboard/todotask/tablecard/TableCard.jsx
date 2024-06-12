import React, { useState } from "react";
import TableCardHeader from "./TableCardHeader";
import TableCardItem from "./TableCardItem";
import EditTaskModul from "@/ui/component/Dashboard/todotask/modul/editTaskModul";

export default function TableCard({ data, loading, error }) {
  const [editTask, setEditTask] = useState(false);

  const handleEditTask = (task) => {
    setEditTask(task, !editTask);
  };

  const handleCloseEditTask = () => {
    setEditTask(null);
  };

  console.log(editTask);

  return (
    <div className="flex flex-col gap-0 border border-input-border dark:border-dark-input-border rounded-main w-full overflow-y-scroll bg-white dark:bg-dark-input-bg relative z-10">
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
