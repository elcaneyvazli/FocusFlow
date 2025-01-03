import React from "react";
import LogoImage from "@/ui/assets/Logo.svg";
import Image from "next/image";

export default function Logo({ size, text, textSize }) {
  return (
    <div className="flex flex-row items-center gap-12">
      <Image src={LogoImage} alt="logo" width={size} height={size} />
      <h1 className={`font-medium text-text ${textSize ? `text-xl` : ""}`}>
        {text}
      </h1>
    </div>
  );
}
