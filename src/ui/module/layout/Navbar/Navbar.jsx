import React from "react";
import Logo from "../../blocks/Logo/Logo";
import dynamic from "next/dynamic";
const DarkModeButton = dynamic(
  () => import("../../blocks/Button/DarkModeButton"),
  {
    loading: () => <p>loading...</p>,
  }
);
const UserBadge = dynamic(() => import("./UserBadge"), {
  loading: () => <p>loading...</p>,
});

export default function Navbar() {
  return (
    <div className="min-h-[64px] h-[64px] max-h-[64px] flex flex-row justify-between items-center px-24">
      <Logo size={40} textSize={"text-xl"} />
      <div className="flex flex-row items-center gap-8">
        <DarkModeButton type={"icon-solid"} />
        <UserBadge />
      </div>
    </div>
  );
}
