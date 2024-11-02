import React, { useState } from "react";
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function PassInput({ value, change, registername, error, register }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-sm font-medium text-primary dark:text-input-bg">Password:</h1>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <ShieldCheckIcon className="w-[18px] h-[18px] text-light" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={change}
          placeholder="123456789"
          {...register(registername)}
          autoComplete="on"
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12 text-primary dark:text-input-bg"
        />
        <button
          type="button"
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
      {error && <p className="text-red-bg text-sm">{error}</p>}
    </div>
  );
}
