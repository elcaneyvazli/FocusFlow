import React, { useEffect, useState } from "react";

const Ripple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const removeRipple = (id) => {
      setRipples((prevRipples) =>
        prevRipples.filter((ripple) => ripple.id !== id)
      );
    };

    ripples.forEach((ripple) => {
      const timer = setTimeout(() => {
        removeRipple(ripple.id);
      }, 1000);

      return () => clearTimeout(timer);
    });
  }, [ripples]);

  const addRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    setRipples([
      ...ripples,
      {
        id: Date.now(),
        x: e.clientX - rect.left - radius,
        y: e.clientY - rect.top - radius,
        diameter,
      },
    ]);
  };

  return {
    ripples: ripples.map((ripple) => (
      <span
        key={ripple.id}
        className="absolute animate-ripple rounded-full dark:bg-white/30 bg-black/20"
        style={{
          left: ripple.x + "px",
          top: ripple.y + "px",
          width: ripple.diameter + "px",
          height: ripple.diameter + "px",
        }}
      />
    )),
    addRipple,
  };
};

export default Ripple;