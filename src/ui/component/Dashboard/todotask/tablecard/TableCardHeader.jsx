import React from "react";

export default function TableCardHeader() {
  return (
    <div className="flex flex-row gap-0 items-center rounded-t-main bg-[#F9FAFB min-w-full">
      <div className="flex p-16 min-w-[250px] max-w-[250px] border-r border-b border-input-border bg-[#F9FAFB]">
        <h1 className="text-black text-sm font-medium">Name</h1>
      </div>
      <div className="flex p-16 min-w-[150px] border-r border-b  border-input-border bg-[#F9FAFB]">
        <h1 className="text-black text-sm font-medium">Priority</h1>
      </div>
      <div className="flex p-16 border-r border-b  border-input-border min-w-[600px] lg:w-full bg-[#F9FAFB]">
        <h1 className="text-black text-sm font-medium">Description</h1>
      </div>
      <div className="flex p-16 min-w-[150px] border-b  border-r border-input-border bg-[#F9FAFB]">
        <h1 className="text-black text-sm font-medium">Timeline</h1>
      </div>
      <div className="flex p-16 min-w-[50px] min-h-[54px] border-b  border-input-border bg-[#F9FAFB]"></div>
    </div>
  );
}
