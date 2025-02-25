"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const GroupCardContainer = dynamic(
  () => import("./GroupCard/GroupCardContainer"),
  {
    loading: () => (
      <div className="grid grid-cols-12 gap-16">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            className="w-full col-span-12 sm:col-span-6 lg:col-span-4 bg-elevation border border-border flex flex-col gap-0 rounded-md cursor-pointer animate-pulse"
            key={index}
          >
            <div className="flex flex-col gap-4 p-12">
              <div className="w-64 h-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
              <div className="w-96 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
            </div>
            <div className="border-t border-border flex flex-row justify-between items-end p-12">
              <div className="relative w-[64px] h-[24px]">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="absolute top-0"
                    style={{ left: `${index * 16}px`, zIndex: 3 - index }}
                  >
                    <div className="w-24 h-24 bg-background animate-pulse rounded-full border border-border"></div>
                  </div>
                ))}
              </div>
              <p className="w-96 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></p>
            </div>
          </div>
        ))}
      </div>
    ),
  }
);
const GroupForm = dynamic(() => import("./GroupForm"), {
  loading: () => (
    <div className="flex flex-row items-center gap-16">
      <div className="w-full h-[36px] bg-elevation border border-border animate-pulse rounded-md"></div>
      <div className="w-64 h-[36px] bg-elevation border border-border animate-pulse rounded-md"></div>
    </div>
  ),
});

export default function GroupPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className="flex flex-col gap-16 p-12 h-full w-full overflow-y-auto">
      <GroupForm onSearch={handleSearch} />
      <GroupCardContainer searchQuery={searchQuery} />
    </div>
  );
}
