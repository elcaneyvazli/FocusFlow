import React from "react";

export default function TableCardHeader() {
  return (
    <div className="flex flex-row gap-0 items-center rounded-t-main bg-[#F9FAFB] dark:bg-primary min-w-full">
      
      <div className="flex p-16 min-w-[250px] max-w-[250px] border-r border-b border-input-border dark:border-dark-input-border bg-[#F9FAFB] dark:bg-primary">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Title
        </h1>
      </div>
      <div className="flex p-16 border-r border-b border-input-border dark:border-dark-input-border min-w-[500px] lg:w-full bg-[#F9FAFB] dark:bg-primary">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Description
        </h1>
      </div>
      <div className="flex p-16 min-w-[150px] border-b  border-r border-input-border dark:border-dark-input-border bg-[#F9FAFB] dark:bg-primary">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Priority
        </h1>
      </div>
      <div className="flex p-16 min-w-[150px] border-b  border-r border-input-border dark:border-dark-input-border bg-[#F9FAFB] dark:bg-primary">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Due To
        </h1>
      </div>
      <div className="flex p-16 min-w-[50px] min-h-[54px] border-b  border-input-border dark:border-dark-input-border bg-[#F9FAFB] dark:bg-primary"></div>
    </div>
  );
}
