"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { SideBarItem } from "@/library/sidebaritem";
import { usePathname, useRouter } from "next/navigation";

export default function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index, link) => {
    setActiveIndex(index);
    router.push(link);
  };

  const isLinkActive = (link) => {
    if (link === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    return pathname.startsWith(link);
  };

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        zIndex: 60,
      }}
    >
      <div className="flex flex-row items-center justify-between lg:justify-center gap-8 rounded-none lg:rounded-full w-full lg:w-fit px-16 py-8 lg:p-4 relative lg:bg-transparent bg-elevation">
        {SideBarItem.map((item, index) => {
          const isActive = isLinkActive(item.link);
          return (
            <motion.button
              key={index}
              className={`relative w-[36px] lg:w-fit h-[36px] lg:h-fit px-0 lg:px-12 py-0 lg:py-4 flex flex-col lg:flex-row items-center justify-center gap-4 rounded-md cursor-pointer whitespace-nowrap text-text 
                ${
                  isActive
                    ? ""
                    : "hover:bg-background hover:border hover:border-border hover:px-[calc(12px-1px)] hover:py-[calc(4px-1px)]"
                }
                `}
              onClick={() => handleItemClick(index, item.link)}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`text-sm font-normal z-20 text-text ${
                  isActive ? "text-white" : "text-text"
                }`}
              >
                {item.icon}
              </div>
              <h1
                className={`hidden lg:block text-sm font-normal z-20 line-clamp-1  ${
                  isActive ? "text-white" : "text-text"
                } 
                }`}
              >
                {item.title}
              </h1>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-b from-primary-600 to-primary-700 z-10 border border-primary-400 outline outline-2 outline-primary-200"
                  layout
                  layoutId="active"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
