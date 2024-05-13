import React from "react";

export default function Header({ text }) {
  return (
    <div className="px-8 py-4 border-l-2 border-primary dark:border-input-bg">
      <h1 className="text-2xl font-bold text-primary dark:text-input-bg">{text}</h1>
    </div>
  );
}
