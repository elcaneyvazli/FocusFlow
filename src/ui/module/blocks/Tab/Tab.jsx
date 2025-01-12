"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

export default function Tab({ tabs, component }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="z-30 relative flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-12 border-b border-border">
        <div className="flex flex-row gap-0 items-center w-full sm:w-fit relative">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col gap-16 items-start w-full sm:w-fit z-30"
            >
              <motion.button
                className={`flex flex-row items-center justify-center gap-8 px-16 py-12 w-full sm:w-fit relative border-0 ${
                  activeTab.id === tab.id ? "text-text" : "text-light"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.icons}
                <h1 className={`text-md font-medium `}>{tab.title}</h1>
                {activeTab.id === tab.id && (
                  <motion.div
                    className="absolute inset-0 z-10 border-b-2 border-primary-500"
                    layoutId="underline"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-16 items-end justify-end w-full">
          {component}
        </div>
      </div>

      <div className="flex flex-col gap-16 w-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`w-full ${activeTab.id === tab.id ? "block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
