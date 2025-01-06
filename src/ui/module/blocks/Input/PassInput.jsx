"use client";
import { Eye, EyeClosed, Shield, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

export default function PassInput({ variant }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4">
        <p className="text-sm font-medium text-text">Password</p>
        <p className="text-sm font-medium text-primary-600">*</p>
      </div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <ShieldCheck className="w-[18px] h-[18px] text-light" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="123456789"
          autoComplete="on"
          className="bg-elevation border border-border text-text text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 focus:outline focus:outline-primary-200 block w-full ps-40 px-16 py-12 h-[36px]"
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-16 z-50 pointer-events-auto"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="w-[18px] h-[18px] text-light" />
          ) : (
            <EyeClosed className="w-[18px] h-[18px] text-light" />
          )}
        </button>
      </div>
    </div>
  );
}
