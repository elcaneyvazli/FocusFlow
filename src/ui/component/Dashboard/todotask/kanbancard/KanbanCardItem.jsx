"use client";
import {
  ClockIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

export default function KanbanCardItem() {
  const [check, setcheck] = useState(false);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8 bg-white border border-input-border p-16 rounded-main">
        <div className="flex flex-row justify-between items-center">
          <motion.div
            className={`flex items-center justify-center border border-input-border h-[20px] w-[20px] rounded-main cursor-pointer ${
              check ? "bg-primary" : "bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setcheck(!check)}
          >
            {check && <CheckIcon className="h-[12px] w-[12px] text-white" />}
          </motion.div>
          <EllipsisHorizontalIcon className="h-[20px] w-[20px] text-primary" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-md font-bold text-primary">
            Lorem Ipsum Dolor Set
          </h1>
          <p className="text-xs text-light line-clamp-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae nunc ac lectus vehicula pharetra non vel arcu. Proin diam
            nulla.
          </p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <ClockIcon className="h-[16px] w-[16px] text-primary" />
            <p className="text-sm text-primary">Timeline</p>
          </div>
          <p className="text-sm text-primary">-</p>
          <p className="text-sm text-light">25.04.2024</p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <BookmarkIcon className="h-[16px] w-[16px] text-primary" />
            <p className="text-sm text-primary">Label</p>
          </div>
          <p className="text-sm text-primary">-</p>
          <div className="flex flex-row gap-4 items-center w-full overflow-x-auto">
            <div className="px-8 py-4 flex items-center justify-center border border-input-border bg-input-bg rounded-main whitespace-nowrap">
              <p className="text-xs text-primary">Web Design</p>
            </div>
            <div className="px-8 py-4 flex items-center justify-center border border-input-border bg-input-bg rounded-main whitespace-nowrap">
              <p className="text-xs text-primary">Frontend</p>
            </div>
            <div className="px-8 py-4 flex items-center justify-center border border-input-border bg-input-bg rounded-main whitespace-nowrap">
              <p className="text-xs text-primary">Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
