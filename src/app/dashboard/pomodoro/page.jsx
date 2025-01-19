"use client";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import React from "react";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function page() {
  return (
    <div className="p-12 flex items-center justify-center h-full">
      <FlipClockCountdown
        to={new Date().getTime() + 25 * 60 * 1000}
        labels={["Hours", "Minutes", "Seconds"]}
        labelStyle={{ fontSize: 20, color: "#2D2D2D" }}
        digitBlockStyle={{ width: 150, height: 170, fontSize: 96 }}
        showLabels={true}
        showSeparators={true}
        separatorStyle={{ color: "#2D2D2D" }}
        renderMap={{
          days: () => null,
          hours: ({ value, label }) => (
            <div className="flip-clock__unit">
              <span className="flip-clock__label">{label}</span>
              <div className="flip-clock__digit">{value}</div>
            </div>
          ),
          minutes: ({ value, label }) => (
            <div className="flip-clock__unit">
              <span className="flip-clock__label">{label}</span>
              <div className="flip-clock__digit">{value}</div>
            </div>
          ),
          seconds: ({ value, label }) => (
            <div className="flip-clock__unit">
              <span className="flip-clock__label">{label}</span>
              <div className="flip-clock__digit">{value}</div>
            </div>
          ),
        }}
      />
    </div>
  );
}
