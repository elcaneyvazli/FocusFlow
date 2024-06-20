import React, { useState, useEffect } from "react";

const FlipUnit = ({ digit, prevDigit }) => {
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const timeout = setTimeout(() => setFlipping(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative w-[350px] h-[350px] perspective flex flex-row">
      <div
        className={`absolute w-full h-full bg-primary text-input-bg flex items-center justify-center rounded-main ${
          flipping ? "animate-flipTop" : ""
        }`}
      >
        {prevDigit}
      </div>
      <div
        className={`absolute w-full h-full bg-primary text-input-bg flex items-center justify-center rounded-main ${
          flipping ? "animate-flipBottom" : ""
        }`}
      >
        {digit}
      </div>
    </div>
  );
};

const FlipClock = ({ time }) => {
  const formatTimeUnit = (unit) => unit.toString().padStart(2, "0").split("");

  const minutes = formatTimeUnit(Math.floor(time / 60));
  const seconds = formatTimeUnit(time % 60);

  return (
    <div className="flex flex-row gap-16 justify-center items-center h-full w-full text-white text-9xl">
      <div className="flex flex-row items-center gap-16 ">
        <FlipUnit digit={minutes[0]} prevDigit={(minutes[0] - 1 + 10) % 10} />
        <FlipUnit digit={minutes[1]} prevDigit={(minutes[1] - 1 + 10) % 10} />
      </div>
      <h1 className="tetx-4xl text-primary dark:text-input-bg">:</h1>
      <div className="flex flex-row items-center gap-16 ">
        <FlipUnit digit={seconds[0]} prevDigit={(seconds[0] - 1 + 10) % 10} />
        <FlipUnit digit={seconds[1]} prevDigit={(seconds[1] - 1 + 10) % 10} />
      </div>
    </div>
  );
};

export default FlipClock;
