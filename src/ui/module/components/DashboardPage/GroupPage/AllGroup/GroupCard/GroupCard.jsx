import Avvvatars from "avvvatars-react";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function GroupCard({ group }) {
  const router = useRouter();
  return (
    <motion.div
      className="w-full col-span-12 sm:col-span-6 lg:col-span-4 bg-elevation border border-border flex flex-col gap-0 rounded-md cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(`/dashboard/group/${group.id}`)}
    >
      <div className="flex flex-col gap-4 p-12">
        <h1 className="text-md text-text line-clamp-1 leading-tight">
          {group.name}
        </h1>
        <p className="text-sm text-light line-clamp-1 leading-tight">
          {group.description}
        </p>
      </div>
      <div className="border-t border-border flex flex-row justify-between items-end p-12">
        <div className="relative w-[64px] h-[24px]">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="absolute top-0"
              style={{ left: `${index * 16}px`, zIndex: 3 - index }}
            >
              <Avvvatars
                size={24}
                theme="leafy"
                shape="square"
                variant="grid"
                style={{ width: "24px", height: "24px" }}
                className="rounded-full border-2 border-white dark:border-dark-input-bg"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-light">{group.memberCount} members</p>
      </div>
    </motion.div>
  );
}
