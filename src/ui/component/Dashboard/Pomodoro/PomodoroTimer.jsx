import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTime,
  decrementTime,
  toggleTimer,
  setIsDragging,
  setStartAngle,
} from "@/redux/features/TimerSlice/TimerSlice";

export default function PomodoroTimer() {
  const dispatch = useDispatch();
  const { time, isActive, isDragging, startAngle } = useSelector(
    (state) => state.timer
  );
  const svgRef = useRef(null);
  const handRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    } else if (time === 0) {
      dispatch(toggleTimer());
    }
    return () => clearInterval(interval);
  }, [isActive, time, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateAngle = (seconds) => {
    return (seconds / 3600) * 360;
  };

  const getMouseAngle = (clientX, clientY) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    const centerX = svgRect.width / 2;
    const centerY = svgRect.height / 2;
    const mouseX = clientX - svgRect.left;
    const mouseY = clientY - svgRect.top;

    let angle =
      Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
    return (angle + 360) % 360;
  };

  const handleMouseDown = (e) => {
    if (e.target === handRef.current) {
      dispatch(setIsDragging(true));
      const currentAngle = getMouseAngle(e.clientX, e.clientY);
      dispatch(setStartAngle(currentAngle - calculateAngle(time)));
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isActive) {
      const currentAngle = getMouseAngle(e.clientX, e.clientY);
      let angleDiff = (currentAngle - startAngle + 360) % 360;
      setTimeFromAngle(angleDiff);
    }
  };

  const handleMouseUp = () => {
    dispatch(setIsDragging(false));
  };

  const progressPercentage = time / 3600;

  const setTimeFromAngle = (angle) => {
    let newSeconds = Math.round((angle / 360) * 3600);
    newSeconds = Math.max(60, Math.min(3600, newSeconds));
    dispatch(setTime(newSeconds));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-16">
        <svg
          ref={svgRef}
          className="w-[320px] h-[320px] mx-auto"
          viewBox="0 0 100 100"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* {[...Array(60)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="0"
              x2={"46"}
              y2="0"
              stroke={"#9CA3AF"}
              strokeWidth={"2"}
              transform={`rotate(${i * 6} 50 50)`}
            />
          ))} */}
          <circle cx="50" cy="50" r="40" fill="white" />
          <path
            d={`M50,50 L50,10 A40,40 0 ${progressPercentage > 0.5 ? 1 : 0},1 ${
              50 + 40 * Math.sin(2 * Math.PI * progressPercentage)
            },${50 - 40 * Math.cos(2 * Math.PI * progressPercentage)} Z`}
            fill="#EF4444"
          />
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="white"
            stroke="#D1D5DB"
            strokeWidth="1"
            style={{ cursor: "pointer" }}
          />
          <line
            ref={handRef}
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${calculateAngle(time)} 50 50)`}
            style={{ cursor: "pointer" }}
            onMouseDown={handleMouseDown}
          />
          <circle cx="50" cy="50" r="3" fill="#3B82F6" />
        </svg>
        <p className="text-4xl text-primary dark:text-input-bg">
          {formatTime(time)}
        </p>
      </div>
      <div className="flex items-center justify-center  rounded-full px-16 py-4 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border">
        <p className="text-md text-primary dark:text-input-bg">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          →{" "}
          {new Date(Date.now() + time * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button
        onClick={() => dispatch(toggleTimer())}
        className="w-full bg-red-500 text-white py-8 rounded-md hover:bg-red-600 transition duration-300"
      >
        {isActive ? "PAUSE SESSION" : "START SESSION"}
      </button>
    </div>
  );
}
