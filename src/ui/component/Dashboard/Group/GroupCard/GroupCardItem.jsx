import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Avvvatars = dynamic(() => import("avvvatars-react"), { ssr: false });

export default function GroupCardItem({ item }) {
  console.log(item);
  const router = useRouter();
  return (
    <motion.div
      className="text-primary dark:text-input-bg col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main p-12 flex flex-col gap-8 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(`/dashboard/group/${item.id}`)}
    >
      <div className="flex flex-col gap-0 pb-12 border-b-2 border-input-border dark:border-dark-input-border">
        <h1 className="text-md font-semibold text-primary dark:text-input-bg line-clamp-1">
          {item.name}
        </h1>
        <p className="text-sm font-normal text-primary dark:text-input-bg line-clamp-1">
          {item.description}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="relative w-[64px] h-[32px]">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="absolute top-0"
              style={{ left: `${index * 16}px`, zIndex: 3 - index }}
            >
              <Avvvatars
                size={32}
                theme="leafy"
                shape="square"
                variant="grid"
                style={{ width: "32px", height: "32px" }}
                className="rounded-full border-2 border-white dark:border-dark-input-bg"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm font-normal text-primary dark:text-input-bg line-clamp-1">
            128 members
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function GroupCardItemSkeleton() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main p-12 flex flex-col justify-between gap-8 h-[100px]">
      <div className="flex flex-col gap-0 pb-12 border-b-2 border-input-border dark:border-dark-input-border">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
      </div>
    </div>
  );
}
