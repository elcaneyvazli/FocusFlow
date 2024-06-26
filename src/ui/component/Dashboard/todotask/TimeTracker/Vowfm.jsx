import { PauseIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Vowfm({ time }) {
  return (
    <div className="w-full flex flex-row items-center justify-between z-50">
        <div></div>
      <div className="w-full flex flex-col items-center justify-center gap-8 z-50">
        <div className="flex flex-row items-center justify-center p-16 bg-primary rounded-full">
          <PauseIcon className="h-64 w-64 dark:text-input-bg text-primary" />
        </div>
        <h1 className="text-4xl font-medium text-input-bg">{time}</h1>
      </div>
    </div>
  );
}
