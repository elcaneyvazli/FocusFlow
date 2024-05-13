import React from "react";
import { useState } from "react";
import {
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function PassInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-sm font-medium">Password:</h1>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <ShieldCheckIcon className="w-[18px] h-[18px] text-light" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="123456789"
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12"
        />
        <button
          className="absolute inset-y-0 end-0 flex items-center pe-16 z-50 pointer-events-auto"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeIcon className="w-[18px] h-[18px] text-[#9CA3AF]" />
          ) : (
            <EyeSlashIcon className="w-[18px] h-[18px] text-[#9CA3AF]" />
          )}
        </button>
      </div>
    </div>
  );
}
