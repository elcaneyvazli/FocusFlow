import React from "react";
import StatsCardContainer from "./StatsCard/StatsCardContainer";

export default function TaskAnalysisContainer() {
  return (
    <div className="col-span-8 w-full h-full flex flex-col gap-16 overflow-y-auto">
      <StatsCardContainer />
    </div>
  );
}
