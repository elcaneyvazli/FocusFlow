"use client";
import React from "react";
import Logo from "../../../blocks/Logo/Logo";
import DarkModeButton from "../../../blocks/Button/DarkModeButton";
import Button from "../../../blocks/Button/Button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between items-center">
      <Logo text={"Focus Flow"} textSize={"2xl"} size={"36"} />
      <div className="flex flex-row items-center gap-8">
        <div className="hidden flex-row items-center gap-8 md:flex">
          <Button
            text={"Login"}
            size={"medium"}
            type="base"
            onClick={() => {
              router.push("/login");
            }}
          />
          <Button
            text={"Register"}
            size={"medium"}
            type="base"
            onClick={() => {
              router.push("/register");
            }}
          />
        </div>
        <DarkModeButton type={"icon-base"} />
      </div>
    </div>
  );
}
