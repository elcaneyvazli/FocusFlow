import React from "react";
import Image from "next/image";
import LogoImage from "@/ui/assets/Logo.svg";

export default function Logo({ size, text, textSize }) {
  return (
    <div className="flex flex-row items-center gap-12 bor">
      <Image
        src={LogoImage}
        alt="logo"
        width={size}
        height={size}
        className="border border-border rounded-md"
      />
      <h1 className={`font-semibold text-text ${textSize ? `text-xl` : ""}`}>
        {text}
      </h1>
    </div>
  );
}
