import { ArrowUp, ClipboardList } from "lucide-react";
import React from "react";

export default function TaskAnalysisContainer() {
  return (
    <div className="col-span-8 w-full h-full flex flex-col gap-16 overflow-y-auto">
      <div className="bg-elevation border border-border rounded-md w-full flex flex-row gap-8">
        <div className="border-l border-border p-12 flex flex-col gap-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-text text-lg font-medium">Completed Tasks</p>
            <div className="px-8 py-8 bg-background border border-border text-text rounded-md">
              <ClipboardList className="text-text" size={24} />
            </div>
          </div>
          <div className="flex flex-row items-center gap-8">
            <p className="text-text text-2xl font-medium">22</p>
            <div className="bg-success-100 border border-success-600 flex items-center justify-center rounded-full p-2">
              <ArrowUp className="text-success-600" size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
