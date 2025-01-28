import React from "react";
import GroupDetailCard from "./GroupDetailCard/GroupDetailCard";
import GroupDetailCardContainer from "./GroupDetailCard/GroupDetailCardContainer";

export default function GroupDetailContainer() {
  return (
    <div className="w-full bg-elevation border border-border h-full rounded-md p-12 flex flex-col gap-12">
      <GroupDetailCardContainer />
    </div>
  );
}
