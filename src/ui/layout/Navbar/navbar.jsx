import React from "react";
import Breadcrumb from "../../block/breadcrumb/breadcrumb";
import {
  BellIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import profile from "@/ui/assert/profile.jpg";

export default function navbar() {
  return (
    <div className="px-16 py-12 flex flex-row justify-between items-center bg-white border-b border-input-border z-80">
      <Breadcrumb />
      <div className="flex flex-row gap-16 items-center">
        <button className="px-8 bg-input-bg border border-input-border rounded-main h-40">
          <SunIcon className="h-24 w-24 text-primary" />
        </button>
        <button className="px-8 bg-input-bg border border-input-border rounded-main h-40">
          <BellIcon className="h-24 w-24 text-primary" />
        </button>
        <button className="px-8 bg-input-bg border border-input-border rounded-main h-40">
          <Cog8ToothIcon className="h-24 w-24 text-primary" />
        </button>
        <div className="flex flex-row gap-12 items-center">
          <div className="h-40 w-40 rounded-full">
            <Image
              src={profile}
              alt="avatar"
              width={0}
              height={0}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-xs font-medium text-primary">John Doe</p>
            <p className="text-xs font-normal text-light">johndoe@gmail.com</p>
          </div>
          <ChevronDownIcon className="h-[14px] w-[14px] text-primary" />
        </div>
      </div>
    </div>
  );
}
