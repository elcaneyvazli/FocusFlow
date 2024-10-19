import React from "react";

export default function TextInput({
  title,
  placeholder,
  icon,
  error,
  registername,
  register,
  value,
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {title && (
        <h1 className="text-sm font-medium text-primary dark:text-input-bg">{title}</h1>
      )}
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12 h-40"
          {...register(registername)}
        />
      </div>
      {error && <p className="text-red-bg text-sm">{error}</p>}
    </div>
  );
}
