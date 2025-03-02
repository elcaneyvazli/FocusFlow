import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@/ui/module/blocks/Button/Button";
import { ChevronDown, Expand, Plus, Settings2, Timer } from "lucide-react";
import { motion } from "framer-motion";
import {
  toggleFullScreen,
  togglePomodoroTask,
  toggleTimer,
  setTime,
  decrementTime,
} from "@/redux/features/TimerSlice/TimerSlice";
import NumberFlow from "@number-flow/react";
import { useAppSelector } from "@/redux/store";

export default function PomodoroContainer({ columns }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedTask = useAppSelector((state) => state.timer.selectTask);
  const isActive = useAppSelector((state) => state.timer.isActive);
  const time = useAppSelector((state) => state.timer.time);

  useEffect(() => {
    const savedTime = localStorage.getItem("pomodoroTime");
    if (savedTime) {
      dispatch(setTime(Number(savedTime)));
    }
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, dispatch]);

  useEffect(() => {
    localStorage.setItem("pomodoroTime", time);
  }, [time]);

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

  const handleStartStop = () => {
    dispatch(toggleTimer());
  };

  return (
    <div className="relative">
      <div className="bg-elevation border border-border rounded-md flex flex-col sm:flex-row gap-12 p-8 items-center hover:border-primary-500 hover:outline hover:outline-primary-700">
        <motion.button
          className="rounded-md flex flex-row items-center justify-between bg-background border border-border px-12 py-8 w-full"
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            dispatch(togglePomodoroTask());
          }}
        >
          <div className="flex flex-row items-center gap-4">
            {selectedTask ? (
              <>
                <p className="text-text text-sm font-medium line-clamp-1">
                  {selectedTask.title}
                </p>
                {selectedTask.description && (
                  <p className="text-light text-sm ml-4 line-clamp-1">
                    - {selectedTask.description}
                  </p>
                )}
              </>
            ) : (
              <>
                <Plus size={18} className="text-text" />
                <p className="text-text text-sm font-medium">Add Project</p>
              </>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-text" />
          </motion.div>
        </motion.button>
        <div className="flex flex-row items-center gap-12 border-l border-border pl-8">
          <div className="border-r border-border pr-8 flex flex-row items-center gap-4">
            {/* <Button
              type="icon-text"
              size="medium"
              icon={<Settings2 size={20} />}
              iconPosition="right"
              color={"success"}
            /> */}
            <Button
              type="icon-text"
              size="medium"
              icon={<Expand size={20} />}
              iconPosition="right"
              color={"success"}
              onClick={() => {
                dispatch(toggleFullScreen());
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <NumberFlow
              value={timeObj.minutes}
              className="text-text text-md font-medium"
              duration={200}
            />
            <span className="text-text text-md font-medium">:</span>
            <NumberFlow
              value={timeObj.seconds}
              className="text-text text-md font-medium"
              duration={200}
            />
          </div>
          <Button
            text={isActive ? "Stop" : "Start"}
            type="primary"
            size="small"
            icon={<Timer size={18} />}
            iconPosition="right"
            color={isActive ? "error" : "success"}
            onClick={handleStartStop}
          />
        </div>
      </div>
    </div>
  );
}
