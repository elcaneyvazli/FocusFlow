"use client";
import React from "react";
import Logo from "../../blocks/Logo/Logo";
import DarkModeButton from "../../blocks/Button/DarkModeButton";
import Button from "../../blocks/Button/Button";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Logo text={"Focus Flow"} textSize={"2xl"} size={"36"} />
      <div className="flex flex-row items-center gap-8">
        <DarkModeButton />
        <Button />
      </div>
    </div>
  );
}
