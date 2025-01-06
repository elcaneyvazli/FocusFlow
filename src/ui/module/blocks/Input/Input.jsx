import React from "react";

export default function Input({
  title,
  placeholder,
  icon,
  variant,
  required,
  label,
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4">
        {title && <p className="text-sm font-medium text-text">{title}</p>}
        {required && <p className="text-sm font-medium text-primary-600">*</p>}
      </div>
      <div className="flex flex-col gap-0">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-12 pointer-events-none">
            {icon}
          </div>
          <input
            type="text"
            placeholder={placeholder}
            className="bg-elevation border border-border text-text text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 focus:outline focus:outline-primary-200 block w-full ps-40 px-16 py-12 h-[36px]"
          />
        </div>
        {label && <p className="text-[10px] font-normal text-text">{title}</p>}
      </div>
    </div>
  );
}
