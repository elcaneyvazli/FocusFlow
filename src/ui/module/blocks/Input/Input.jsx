import React from "react";

export default function Input({
  title,
  placeholder,
  icon,
  variant,
  required,
  label,
  registername,
  register,
  error,
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4">
        {title && <p className="text-sm font-normal text-text">{title}</p>}
        {required && <p className="text-sm font-medium text-primary-600">*</p>}
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-12 pointer-events-none">
            {icon}
          </div>
          <input
            type="text"
            placeholder={placeholder}
            className={`bg-elevation border ${
              error
                ? "ring-error-500 border-error-500 outline outline-error-200"
                : "border-border focus:ring-primary-500 focus:border-primary-500 focus:outline focus:outline-primary-200"
            } text-text text-sm rounded-md  block w-full ps-40 px-16 py-12 h-[36px]`}
            {...register(registername)}
          />
        </div>
        {error ? (
          <p className="text-[10px] font-normal text-red-500">{error}</p>
        ) : (
          label && <p className="text-[10px] font-normal text-text">{label}</p>
        )}
      </div>
    </div>
  );
}
