import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col gap-0 p-32 items-start bg-black w-full">
      <h1 className="text-white text-[128px]">Want to Talk about a Project?</h1>
      <div className="bg-white flex flex-row gap-24 px-32 py-8 rounded-full items-center">
        <p className="text-black text-xl">Lets Talk</p>
        <div className="flex items-center justify-center p-8 bg-black rounded-full">
          <ArrowRightIcon className="h-[24px] w-[24px] text-white" />
        </div>
      </div>
      
    </div>
  );
}
