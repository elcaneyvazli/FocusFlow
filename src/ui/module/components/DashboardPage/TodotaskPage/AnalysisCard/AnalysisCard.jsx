import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";

export default function AnalysisCard({ title, icon, data, isLoading }) {
  return (
    <motion.div
      className="col-span-12 md:col-span-6 lg:col-span-4 bg-elevation border border-border flex flex-col items-start justify-between w-full rounded-md px-12 py-12 h-[168px]"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-text text-lg font-medium">{title}</h1>
        <div className="px-8 py-8 bg-background border border-border text-text rounded-md">
          {icon}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl text-text">
          {isLoading ? <Spinner /> : data}
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full pt-8 items-center border-t border-border ">
        <Link href={"/dashboard/timeanalysis"}>
          <h1 className="font-medium  text-sm cursor-pointer text-text hover:opacity-70">
            View Details
          </h1>
        </Link>
        <h1 className="text-light text-xs">From the last week</h1>
      </div>
    </motion.div>
  );
}
