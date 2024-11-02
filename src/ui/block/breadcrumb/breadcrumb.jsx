import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

export default function Breadcrumb({ items }) {
  const router = useRouter();
  return (
    <div className="bg-input-bg border border-input-border dark:border-dark-input-border dark:bg-dark-input-bg px-16 rounded-main flex-row gap-8 items-center flex w-fit cursor-pointer">
      {items?.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(item.link)}
          className="flex flex-row gap-8 items-center"
        >
          {index > 0 && (
            <ChevronRightIcon className="h-16 w-16 text-primary dark:text-input-bg" />
          )}
          <div className="flex flex-row gap-4 items-center h-40">
            {item?.icon}
            <h1 className="text-primary dark:text-input-bg text-sm font-medium whitespace-nowrap">
              {item.label}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
