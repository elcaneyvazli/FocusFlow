"use client";
import React from "react";
import GroupDetailCardContainer from "./GroupDetailCard/GroupDetailCardContainer";
import GroupMemberContainer from "./GroupMember/GroupMemberContainer";
import { useAppSelector } from "@/redux/store";

export default function GroupDetailContainer() {
  const groupDetail = useAppSelector((state) => state.group.groupDetail);
  const groupDetailOpen = useAppSelector(
    (state) => state.group.groupDetailOpen
  );

  return (
    <div
      className={`w-full h-full ${
        groupDetail
          ? "fixed inset-0 z-[80] xl:relative xl:inset-auto xl:col-span-4"
          : "hidden xl:relative xl:block xl:col-span-4"
      } bg-elevation border border-border rounded-md p-16 xl:p-12 flex flex-col gap-16`}
    >
      <GroupDetailCardContainer />
      <GroupMemberContainer />
    </div>
  );
}
