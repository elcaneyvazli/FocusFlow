import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TaskCardItem from "./TaskCardItem.jsx";
import { getTasks } from "@/services/task/task.services.jsx";
import card1 from "@/ui/assert/card1.png";
import card2 from "@/ui/assert/card2.png";
import card3 from "@/ui/assert/card3.png";

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
    <div className="grid grid-cols-12 gap-16 grid-rows-1">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4 row-span-1">
        <TaskCardItem
          title={"Total Task"}
          icon={
            <ClipboardDocumentListIcon className="h-32 w-32 text-primary dark:text-input-bg" />
          }
          data={total}
          activity={true}
          img={card2}
        />
      </div>
      <div className="col-span-12 lg:col-span-6 xl:col-span-4 row-span-1">
        <TaskCardItem
          title={"Completed Task"}
          icon={
            <ClipboardDocumentCheckIcon className="h-32 w-32 text-primary dark:text-input-bg" />
          }
          data={completed}
          activity={false}
          img={card1}
        />
      </div>
      <div className="col-span-12 lg:col-span-6 xl:col-span-4 row-span-1">
        <TaskCardItem
          title={"Pending Task"}
          icon={
            <DocumentMagnifyingGlassIcon className="h-32 w-32 text-primary dark:text-input-bg" />
          }
          data={pending}
          activity={true}
          img={card3}
        />
      </div>
    </div>
  );
}
