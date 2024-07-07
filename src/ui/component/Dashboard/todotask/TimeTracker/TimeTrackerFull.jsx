import React from "react";
import { motion } from "framer-motion";
import TimeTrackerTimer from "./TimeTrackerTimer";

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay) => ({
    scale: [1, 1.2],
    opacity: [0, 1, 0],
    transition: {
      delay,
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
    },
  }),
};

export default function TimeTrackerFull({ time, isRunning }) {
  return (
    <div className="flex items-center justify-center relative">
      <div className="relative flex items-center justify-center z-50">
        <div className="flex flex-col gap-0 items-center justify-center absolute z-50">
          <h1 className=" text-white text-[64px] z-50">{time}</h1>
          <h1 className=" text-white text-xl text-center z-50">
            {isRunning ? "In Focus" : "Not In Focus"}
          </h1>
        </div>
        {[250, 350, 450, 550].map((size, index) => (
          <motion.div
            key={index}
            style={{ width: size, height: size }}
            className="absolute border-4 border-input-bg rounded-full z-40"
            custom={index * 0.5}
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
    </div>
  );
}
