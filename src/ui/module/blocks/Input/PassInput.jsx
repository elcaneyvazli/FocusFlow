"use client";
import { Eye, EyeClosed, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

export default function PassInput({
  title = "Password",
  placeholder = "123456789",
  required,
  label,
  registername,
  register,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4">
        {title && <p className="text-sm font-normal text-text">{title}</p>}
        {required && <p className="text-sm font-medium text-primary-600">*</p>}
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-12 pointer-events-none">
            <ShieldCheck className="w-[18px] h-[18px] text-light" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            autoComplete="on"
            className={`bg-elevation border ${
              error
                ? "ring-error-500 border-error-500 outline outline-error-200"
                : "border-border focus:ring-primary-500 focus:border-primary-500 focus:outline focus:outline-primary-200"
            } text-text text-sm rounded-md block w-full ps-40 px-16 py-12 h-[36px]`}
            {...register(registername)}
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-16 z-50 pointer-events-auto"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeClosed className="w-[18px] h-[18px] text-light" />
            ) : (
              <Eye className="w-[18px] h-[18px] text-light" />
            )}
          </button>
        </div>
        {error && (
          <p className="text-[10px] font-normal text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
