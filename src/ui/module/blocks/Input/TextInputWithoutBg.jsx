import React from "react";
import clsx from "clsx";

export default function TextInputWithoutBg({
  placeholder,
  error,
  registername,
  register,
  value,
  onChange,
  disabled,
  textSize = "text-sm",
  onFocus,
  onBlur,
  inputRef,
}) {
  const inputClasses = clsx(
    "focus:ring-none focus:border-none focus:outline-none",
    "bg-transparent w-full text-text",
    "placeholder:text-light",
    textSize,
    {
      "text-text": !error,
      "text-red-600": error,
    }
  );

  const registerProps = register ? register(registername) : {};

  const errorMessage = error?.message || error;

  return (
    <div className={`flex flex-col w-full relative ${errorMessage && "mb-6"}`}>
      <input
        type="text"
        placeholder={placeholder}
        className={inputClasses}
        {...registerProps}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      {errorMessage && (
        <p className="text-xs text-error-600 absolute bottom-[-10px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
