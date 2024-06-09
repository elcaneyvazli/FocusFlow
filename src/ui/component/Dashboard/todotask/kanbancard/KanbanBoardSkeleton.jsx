import React from "react";

export default function KanbanBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-8">
          <div className="px-12 py-8 flex flex-row justify-between items-center w-full rounded-main bg-gray-300">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
          {[...Array(3)].map((_, taskIndex) => (
            <div
              key={taskIndex}
              className="flex flex-col gap-8 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="h-[20px] w-[20px] rounded-main bg-gray-300" />
                <div className="h-[20px] w-[20px] bg-gray-300" />
              </div>
              <div className="flex flex-col gap-0">
                <div className="h-4 bg-gray-300 w-3/4 rounded" />
                <div className="h-3 bg-gray-300 w-1/2 rounded mt-2" />
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div className="h-[16px] w-[16px] bg-gray-300 rounded" />
                  <p className="h-3 bg-gray-300 w-12 rounded" />
                </div>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div className="h-[16px] w-[16px] bg-gray-300 rounded" />
                  <p className="h-3 bg-gray-300 w-12 rounded" />
                </div>
                <div className="h-3 bg-gray-300 w-20 rounded ml-2" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
