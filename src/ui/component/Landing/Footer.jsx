import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import Logo from "@/ui/assert/Logo.svg";
import image1 from "@/ui/assert/1.svg";
import image2 from "@/ui/assert/2.svg";
import image3 from "@/ui/assert/3.svg";
import image4 from "@/ui/assert/4.svg";

export default function Footer() {
  return (
    <div className="flex flex-col gap-32 items-start bg-black w-full px-80">
      <h1 className="text-white text-[128px]">Want to Talk about a Project?</h1>
      <div className="bg-white flex flex-row gap-24 pr-4 pl-16 py-4 rounded-full items-center">
        <p className="text-black text-xl">Lets Talk</p>
        <div className="flex items-center justify-center p-8 bg-black rounded-full">
          <ArrowRightIcon className="h-[24px] w-[24px] text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-8 items-start w-full">
        <div className="flex flex-row justify-between items-center pb-8 border-b border-input-border w-[100%]">
          <div className="flex flex-row gap-8 items-end">
            <div className="w-[40px] h-[40px] z-50">
              <Image
                src={Logo}
                alt="logo"
                width={0}
                height={0}
                draggable="false"
                className="w-full h-full object-cover bg-center z-50"
              />
            </div>
            <h1 className="text-xl text-white font-semibold z-50">FocusFlow</h1>
          </div>
          <div className="flex flex-row gap-12 items-center">
            <div className="w-[24px] h-[24px] z-50">
              <Image
                src={image3}
                alt="logo"
                width={0}
                height={0}
                draggable="false"
                className="w-full h-full object-cover bg-center z-50"
              />
            </div>
            <div className="w-[24px] h-[24px] z-50">
              <Image
                src={image4}
                alt="logo"
                width={0}
                height={0}
                draggable="false"
                className="w-full h-full object-cover bg-center z-50"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center pb-8 text-sm text-white w-full">
          <p>© Copyright 2022, All Rights Reserved</p>
          <div className="flex flex-row items-center gap-16">
            <p>Privacy Policy</p>
            <p> Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
