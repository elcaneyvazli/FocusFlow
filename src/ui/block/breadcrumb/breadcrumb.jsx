import {
  ChevronRightIcon,
  ClockIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function Breadcrumb() {
  return (
    <div className="bg-input-bg border border-input-border dark:border-dark-input-border dark:bg-dark-input-bg px-16 rounded-main flex-row gap-8 items-center hidden sm:flex">
      <div className="flex flex-row gap-4 items-center h-40">
        <DocumentCheckIcon className="h-16 w-16 text-primary dark:text-input-bg" />
        <h1 className="text-primary dark:text-input-bg text-sm font-medium">To-do Task</h1>
      </div>
      <ChevronRightIcon className="h-16 w-16 text-primary dark:text-input-bg" />
      <div className="flex flex-row gap-4 items-center">
        <ClockIcon className="h-16 w-16 text-primary dark:text-input-bg" />
        <h1 className="text-primary dark:text-input-bg text-sm font-medium">Pomodoro</h1>
      </div>
    </div>
  );
}
