"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tasktab } from "@/library/tasktab";
import { motion } from "framer-motion";
import NewTaskButton from "../button/NewTaskButton/NewTaskButton";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(Tasktab[0]);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab.id];
    if (activeTabElement) {
      setUnderlineProps({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <>
      <div className="relative flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-12">
        <div className="flex flex-row gap-0 items-center w-full sm:w-fit relative">
          {Tasktab.map((tab, index) => (
            <motion.div
              key={tab.id}
              className="flex flex-col gap-16 items-start w-full sm:w-fit"
              layout
            >
              <motion.button
                ref={(el) => (tabRefs.current[tab.id] = el)}
                className={`px-16 py-12 border-b w-full sm:w-fit ${
                  activeTab.id === tab.id
                    ? "border-0 dark:border-0 text-primary dark:text-input-bg"
                    : "border-input-border dark:border-dark-input-border text-light"
                }`}
                layoutId={tab.id}
                layout
                onClick={() => setActiveTab(tab)}
              >
                <h1
                  className={`text-md font-medium ${
                    activeTab.id === tab.id
                      ? "text-primary dark:text-input-bg"
                      : "text-light"
                  }`}
                >
                  {tab.title}
                </h1>
              </motion.button>
            </motion.div>
          ))}
          <motion.div
            className="absolute bottom-0 h-[0.5px] bg-primary dark:bg-input-bg"
            initial={false}
            animate={{ left: underlineProps.left, width: underlineProps.width }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <NewTaskButton />
      </div>

      <div className="flex flex-col gap-16 w-full">
        {Tasktab.map((tab) => (
          <div
            key={tab.id}
            className={`w-full ${activeTab.id === tab.id ? "block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
}
