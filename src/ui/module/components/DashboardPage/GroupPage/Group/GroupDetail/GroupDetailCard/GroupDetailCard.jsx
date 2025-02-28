import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import React from "react";
export default function GroupDetailCard({
  icon,
  name,
  description,
  isLoading,
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-8 pb-8 border-b border-border">
      <div className="flex flex-row gap-8 items-center">
        {icon}
        <h1 className="text-text font-medium text-md whitespace-nowrap leading-none">
          {name}
        </h1>
      </div>
      {isLoading ? (
        <Spinner size={12}/>
      ) : (
        <p className="w-full text-text text-sm line-clamp-1 text-end whitespace-nowrap leading-none">
          {description}
        </p>
      )}
    </div>
  );
}
