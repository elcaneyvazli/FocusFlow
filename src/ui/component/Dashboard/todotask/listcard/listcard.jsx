import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Listcard() {
  return (
    <div className="flex flex-col md:flex-row px-16 py-8 items-start justify-between gap-12 md:gap-8 bg-white w-full rounded-main border border-input-border">
      <div className="flex flex-col gap-8 justify-between">
        <div className="px-24 py-2 bg-warning-primary-light rounded-[5px] w-fit">
          <h1 className="text-warning-primary text-sm">High</h1>
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-primary font-bold text-sm">
            Lorem Ipsum Dolor Set
          </h1>
          <h1 className="text-light font-normal text-xs line-clamp-3 md:line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae nunc ac lectus vehicula pharetra non vel arcu.consectetur
            adipiscing elit. Aenean vitae nunc ac lectus vehicula pharetra non
            vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean vitae nunc ac lectus vehicula pharetra non vel
            arcu.consectetur adipiscing elit. Aenean vitae nunc ac lectus
            vehicula pharetra non vel arcu. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean vitae nunc ac lectus vehicula
            pharetra non vel arcu.consectetur adipiscing elit. Aenean vitae nunc
            ac lectus vehicula pharetra non vel arcu.
          </h1>
        </div>
      </div>
        <div className="flex flex-row md:flex-col h-full gap-8 items-center md:items-end justify-between w-full md:w-fit">
          <button className="px-8 py-8 bg-input-bg border border-input-border rounded-main">
            <ClockIcon className="h-[20px] w-[20px] text-input-text" />
          </button>
          <button className="px-32 py-8 bg-input-bg border border-input-border flex flex-row items-center gap-4 rounded-main">
            <PencilIcon className="h-[20px] w-[20px] text-input-text" />
            <h1 className="text-input-text text-sm">Edit</h1>
          </button>
      </div>
    </div>
  );
}
