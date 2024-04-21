"use client";
import React, { useState } from "react";
import { Tasktab } from "@/library/tasktab";
import { motion } from "framer-motion";
import NewTaskButton from "../button/NewTaskButton/NewTaskButton";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(Tasktab[0]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-12">
        <div className="flex flex-row gap-0 items-center w-full sm:w-fit">
          {Tasktab.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col gap-16 items-start w-full sm:w-fit"
            >
              <motion.button
                className={`px-16 py-12 border-b w-full sm:w-fit
                                ${
                                  activeTab.id === tab.id
                                    ? "border-primary text-primary"
                                    : "border-input-border text-input-text"
                                }
                        `}
                onClick={() => setActiveTab(tab)}
              >
                <h1
                  className={`text-md font-medium
                                ${
                                  activeTab.id === tab.id
                                    ? "text-primary"
                                    : "text-light"
                                }
                        `}
                >
                  {tab.title}
                </h1>
              </motion.button>
            </div>
          ))}
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
