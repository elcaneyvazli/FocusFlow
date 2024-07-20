import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TaskCardItem from "./TaskCardItem.jsx";
import { getTasks } from "@/services/task/task.services.jsx";

export default function Taskcard() {
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setTotal(response.total);
        setPending(response.pending);
        setCompleted(response.completed);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      <TaskCardItem
        title={"Total Task"}
        icon={
          <ClipboardDocumentListIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={total}
        activity={true}
      />
      <TaskCardItem
        title={"Completed Task"}
        icon={
          <ClipboardDocumentCheckIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={completed}
        activity={false}
      />
      <TaskCardItem
        title={"Pending Task"}
        icon={
          <DocumentMagnifyingGlassIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={pending}
        activity={true}
      />
    </div>
  );
}
