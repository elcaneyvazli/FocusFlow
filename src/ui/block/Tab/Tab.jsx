"use client";
import React, { Component, useState } from "react";
import { motion } from "framer-motion";
import NewTaskButton from "../button/NewTaskButton/NewTaskButton";

export default function Tab({ tabs, component }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="z-30 relative flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-12">
        <div className="flex flex-row gap-0 items-center w-full sm:w-fit relative">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col gap-16 items-start w-full sm:w-fit z-30"
            >
              <motion.button
                className={`px-16 py-12 border-b w-full sm:w-fit ${
                  activeTab.id === tab.id
                    ? "border-b border-primary dark:border-input-border dark:border-b text-primary dark:text-input-bg"
                    : "border-input-border dark:border-dark-input-border text-light"
                }`}
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
    </>
  );
}
