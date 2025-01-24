import React from "react";
import { ArrowUp, ClipboardList } from "lucide-react";
import ErrorGraph from "../Graphs/ErrorGraph";
import SuccessGraph from "../Graphs/SuccessGraph";

export default function StatsCard({ title, value, percentage, type, icon }) {
  return (
    <div className="border-l border-border p-12 flex flex-col gap-8 w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-text text-lg">{title}</p>
        <div className="px-8 py-8 bg-background border border-border text-text rounded-md">
          {icon}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-8">
            <p className="text-text text-3xl font-medium leading-none">
              {value}
            </p>
            <div
              className={`${
                type === "success"
                  ? "bg-success-100 border-success-600"
                  : "bg-error-100 border-error-600"
              }  border  flex items-center justify-center rounded-full py-4 px-12`}
            >
              <ArrowUp
                className={`${
                  type === "success" ? "text-success-600" : "text-error-600"
                }`}
                size={12}
              />
              <p
                className={`${
                  type === "success" ? "text-success-600" : "text-error-600"
                } text-xs font-medium leading-none`}
              >
                {percentage}%
              </p>
            </div>
          </div>
          <h1 className="text-light text-sm leading-none">
            From the last week
          </h1>
        </div>
        {type === "success" ? <SuccessGraph /> : <ErrorGraph />}
      </div>
    </div>
  );
}
