import React from "react";
import Image from "next/image";
import LogoImg from "@/ui/assert/Logo.svg";

export default function LogoContainer() {
  return (
    <div className="flex flex-row gap-8 items-center">
      <div className="w-[40px] h-[40px]">
        <Image
          src={LogoImg}
          alt="logo"
          width={0}
          height={0}
          className="w-full h-full object-cover bg-center"
        />
      </div>
      <h1 className="text-xl text-black dark:text-input-bg font-bold">
        FocusFlow
      </h1>
    </div>
  );
}
