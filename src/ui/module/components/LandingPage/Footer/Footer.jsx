import Image from "next/image";
import React from "react";
import Logo from "@/ui/assets/Logo.svg";
import image3 from "@/ui/assets/3.svg";
import image4 from "@/ui/assets/4.svg";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-col gap-32 items-start bg-elevation w-full px-16 xs:px-32 sm:px-48">
      <h1 className="text-text text-4xl xs:text-[64px] md:text-[96px] lg:text-[128px]">
        Want to Talk about a Project?
      </h1>
      <div className="bg-background flex flex-row gap-24 pr-4 pl-16 py-4 rounded-full items-center">
        <p className="text-text text-xl">Lets Talk</p>
        <div className="flex items-center justify-center p-8 bg-elevation border border-border rounded-full">
          <ArrowRight className="h-[24px] w-[24px] text-text" />
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
            <h1 className="text-xl text-text font-semibold z-50">FocusFlow</h1>
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
        <div className="flex flex-row justify-between items-center pb-8 text-sm text-text w-full">
          <p>© Copyright {dayjs().format("YYYY")}, All Rights Reserved</p>
          <div className="hidden sm:flex flex-row items-center gap-16">
            <p>Privacy Policy</p>
            <p> Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
