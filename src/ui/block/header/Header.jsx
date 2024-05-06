import React from "react";

export default function Header({ text }) {
  return (
    <div className="px-8 py-4 border-l-2 border-black">
      <h1 className="text-2xl font-bold">{text}</h1>
    </div>
  );
}
