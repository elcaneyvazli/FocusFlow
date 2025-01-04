import React from "react";

export default function Header({ text }) {
  return (
    <div className="px-8 py-2 border-l-2 border-primary-600">
      <h1 className="text-xl font-bold text-text">{text}</h1>
    </div>
  );
}
