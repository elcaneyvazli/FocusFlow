import React from "react";
import { motion } from "framer-motion";

const ViewSelector = ({ currentView, setCurrentView, viewOptions }) => {
  return (
    <div className="flex bg-background rounded-md p-1">
      {viewOptions.map((view) => (
        <motion.button
          key={view.id}
          className={`relative px-32 py-6 flex flex-row items-center justify-center gap-4 rounded-md cursor-pointer whitespace-nowrap ${
            currentView === view.id ? "text-white" : "text-text"
          }`}
          onClick={() => setCurrentView(view.id)}
          whileTap={{ scale: 0.98 }}
        >
          <h1
            className={`hidden lg:block text-sm font-normal z-20 line-clamp-1 ${
              currentView === view.id ? "text-white" : "text-text"
            }`}
          >
            {view.label}
          </h1>
          {currentView === view.id && (
            <motion.div
              className="absolute inset-0 rounded-md bg-gradient-to-b from-primary-600 to-primary-700 z-10 border border-primary-400 outline outline-2 outline-primary-200"
              layoutId="activeView"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ViewSelector;
