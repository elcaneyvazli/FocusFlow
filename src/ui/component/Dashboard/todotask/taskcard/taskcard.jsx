import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { taskcard } from "@/library/taskcard";
import Link from "next/link";

export default function Taskcard() {
  return (
    <>
      {taskcard.map((task) => {
        return (
          <div
            className="bg-white border border-input-border flex flex-col gap-8 items-start w-full rounded-main px-12 py-12"
            key={task.id}
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-primary text-lg font-medium">{task.title}</h1>
              <div className="px-8  py-8 bg-input-bg border border-input-border rounded-main">
                {task.icon}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-4xl text-primary">{task.task}</h1>
            </div>
            <div className="flex flex-row justify-between w-full pt-8 items-center border-t border-input-border ">
              <Link href={"/dashboard/timeanalysis"}>
                <h1 className="font-medium  text-sm cursor-pointer">
                  View Details
                </h1>
              </Link>

              <h1 className="text-light text-xs">From the last month</h1>
            </div>
          </div>
        );
      })}
    </>
  );
}
