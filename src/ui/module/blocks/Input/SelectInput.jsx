import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import TextInputWithoutBg from "./TextInputWithoutBg";
import clsx from "clsx";

export default function SelectInput({
  icon,
  register,
  registername,
  errors,
  data = [],
  value,
  setValue,
  inputEnabled = true,
  size = "medium",
  type = "base",
  label,
  dropdownPosition = "below",
}) {
  const [selectShow, setSelectShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  const getInputClasses = () => {
    return clsx(
      "relative flex items-center rounded-md border w-full transition-all",
      {
        "bg-elevation border-border": type === "base",
        "bg-background border-border": type === "solid",
        "h-[32px] text-sm px-8": size === "small",
        "h-[36px] text-base px-12": size === "medium",
        "h-[40px] text-lg px-16": size === "large",
        "hover:border-primary-600": !isFocused,
        "outline outline-2 outline-primary-200 border-primary-600":
          (inputEnabled && isFocused) || (!inputEnabled && selectShow),
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setSelectShow(false);
    if (e.key === "Enter") setSelectShow(!selectShow);
  };

  useEffect(() => {
    if (register && registername && value) {
      register(registername).onChange({
        target: { value: value }
      });
    }
  }, [value, register, registername]);

  useEffect(() => {
    if (!inputEnabled && data?.length > 0 && !value) {
      setValue(data[0]);
    }
  }, [data, inputEnabled, setValue, value]);

  return (
    <div
      className={getInputClasses()}
      ref={dropdownRef}
      role="combobox"
      aria-expanded={selectShow}
      aria-haspopup="listbox"
      onClick={() => setSelectShow(!selectShow)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex flex-row items-center gap-8 w-full">
        {icon && <span className="flex items-center">{icon}</span>}
        {inputEnabled ? (
          <TextInputWithoutBg
            placeholder="Select Label"
            value={value || ''}
            register={register}
            registername={registername}
            error={errors?.[registername]?.message}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <p className="text-sm text-text w-full">{value || label}</p>
        )}
        <ChevronRight
          size={16}
          className={`transform transition-transform text-text ${
            selectShow ? "rotate-90" : ""
          }`}
        />
      </div>
      {selectShow && data?.length > 0 && (
        <div
          role="listbox"
          className={clsx(
            "absolute w-full bg-elevation border border-border left-0 right-0 rounded-md z-50 min-h-[80px] max-h-[200px] overflow-y-auto",
            {
              "top-[100%] mt-8": dropdownPosition === "below",
              "bottom-[100%] mb-8": dropdownPosition === "above",
            }
          )}
        >
          {data.map((item, index) => (
            <div
              key={index}
              role="option"
              aria-selected={item === value}
              className="cursor-pointer text-sm text-text hover:bg-border px-12 py-8"
              onClick={() => {
                setValue(item);
                setSelectShow(false);
              }}
            >
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
