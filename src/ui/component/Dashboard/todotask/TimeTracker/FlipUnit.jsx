import React, { useState, useEffect } from "react";

export default function FlipUnit({ digit, prevDigit }) {
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const timeout = setTimeout(() => setFlipping(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative origin-left w-[300px] h-[300px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] 2xl:w-[300px] 2xl:h-[300px] perspective flex flex-row">
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
}
