import Image from "next/image";
import React from "react";

export default function TaskCardItem({ title, icon, data, activity, img }) {
  return (
    <div
      className={`bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border flex flex-col gap-8 items-start w-full rounded-main px-12 py-12 relative overflow-hidden`}
    >
      <div className="flex flex-row items-center justify-between w-full z-50">
        <h1 className="text-input-bg dark:text-input-bg text-lg font-medium">
          {title}
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full z-50">
        <h1 className="font-bold text-4xl text-input-bg dark:text-input-bg">
          {data}
        </h1>
      </div>
      <div className="flex flex-row justify-between w-full pt-8 items-center border-t border-input-border z-50">
        <h1 className="text-light text-xs">From the last week</h1>
      </div>
      <div className="absolute top-0 left-0 w-full h-full rounded-main">
        <Image src={img} width={0} height={0} alt="card1" />
      </div>
    </div>
  );
}
