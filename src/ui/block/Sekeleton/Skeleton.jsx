import React from "react";

export default function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gray-500 rounded-main ${className}`}
    ></div>
  );
}
