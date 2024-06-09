import React from "react";
import Link from "next/link";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TaskCardItem from "./taskcarditem";

export default function Taskcard({ total, pending, completed }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      <TaskCardItem
        title={"Total Task"}
        icon={
          <ClipboardDocumentListIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={total}
      />
      <TaskCardItem
        title={"Completed Task"}
        icon={
          <ClipboardDocumentCheckIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={completed}
      />
      <TaskCardItem
        title={"Pending Task"}
        icon={
          <DocumentMagnifyingGlassIcon className="h-24 w-24 text-primary dark:text-input-bg" />
        }
        data={pending}
      />
    </div>
  );
}
