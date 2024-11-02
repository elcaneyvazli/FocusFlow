import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion
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
    if (link === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/';
    }
    return pathname.startsWith(link);
  };

  return (
    <div className="w-full flex items-center justify-center"
      style={{
        zIndex: 60,
      }}
    >
      <div className="flex flex-row items-center justify-between lg:justify-center gap-8 border border-input-border dark:border-dark-input-border rounded-none lg:rounded-full w-full lg:w-fit p-8 lg:p-4 relative bg-input-bg dark:bg-dark-input-bg">
        {SideBarItem.map((item, index) => {
          const isActive = isLinkActive(item.link);
          return (
            <motion.button
              key={index}
              className={`relative px-16 lg:px-12 py-8 lg:py-4 flex flex-col lg:flex-row items-center justify-start gap-4 rounded-main lg:rounded-full cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-white dark:text-input-bg hover:opacity-95"
                  : "text-primary dark:text-input-bg hover:opacity-70"
              }`}
              onClick={() => handleItemClick(index, item.link)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`text-sm font-normal z-20 ${
                  isActive
                    ? "text-primary dark:text-input-bg hover:opacity-95"
                    : "text-primary dark:text-input-bg hover:opacity-70"
                }`}
              >
                {item.icon}
              </div>
              <h1
                className={`hidden xl:block text-sm font-normal z-20 line-clamp-1 ${
                  isActive
                    ? "text-primary dark:text-input-bg hover:opacity-95"
                    : "text-primary dark:text-input-bg hover:opacity-70"
                }`}
              >
                {item.title}
              </h1>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-main lg:rounded-full bg-white dark:bg-primary z-10 border border-input-border dark:border-dark-input-border"
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
