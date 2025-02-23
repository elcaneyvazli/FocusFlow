"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleFullScreen,
  toggleTimer,
} from "@/redux/features/TimerSlice/TimerSlice";
import { useDispatch } from "react-redux";
import Button from "@/ui/module/blocks/Button/Button";
import { Expand, Shrink, Timer } from "lucide-react";
import NumberFlow from "@number-flow/react";

export default function FullScreenPomodoro() {
  const dispatch = useDispatch();
  const taskValue = useAppSelector((state) => state.timer.fullScreen);
  const isActive = useAppSelector((state) => state.timer.isActive);
  const time = useAppSelector((state) => state.timer.time);

  const formatTime = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return {
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds:
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`,
    };
  };

  const timeObj = formatTime(time);

  return (
    <AnimatePresence>
      {taskValue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full md:h-screen flex flex-col items-center justify-between z-[100] bg-background p-12"
        >
          <div className="w-full flex flex-row justify-end">
            <Button
              icon={<Shrink size={24} className="text-white" />}
              type="icon-primary"
              size="large"
              onClick={() => dispatch(toggleFullScreen())}
            />
          </div>

          <div className="flex flex-row items-center gap-4 scale-150">
            <div className="flex items-center justify-center p-12 bg-elevation border border-border rounded-md">
              <NumberFlow
                value={timeObj.minutes}
                className="text-text text-[96px] font-medium"
                duration={200}
              />
            </div>
            <span className="text-text text-4xl font-medium">:</span>
            <div className="flex items-center justify-center p-12 bg-elevation border border-border rounded-md">
              <NumberFlow
                value={timeObj.seconds}
                className="text-text text-[96px] font-medium"
                duration={200}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-8">
            <Button
              text={isActive ? "Stop" : "Start"}
              type="primary"
              size="large"
              icon={<Timer size={24} />}
              iconPosition="right"
              color={isActive ? "error" : "success"}
              onClick={() => dispatch(toggleTimer())}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
