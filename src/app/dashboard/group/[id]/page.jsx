"use client";
import {
  useGroupById,
  useGroupMembers,
  useGroupProject,
} from "@/redux/features/GroupSlice/GroupSlice";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import GroupDetails from "@/ui/component/Dashboard/Group/GroupDetails/GroupDetails";
import GroupProjectContainer from "@/ui/component/Dashboard/Group/GroupProject/GroupProjectCard/GroupProjectContainer";
import GroupProjectFilter from "@/ui/component/Dashboard/Group/GroupProject/GroupProjectFilter/GroupProjectFilter";

export default function Page() {
  const { id } = useParams();

  const {
    group,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = useGroupById(id);
  const {
    members,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useGroupMembers(id);
  const {
    groupProject,
    isLoading: isGroupProjectLoading,
    isError: isGroupProjectError,
  } = useGroupProject(id);

  if (isGroupLoading || isMembersLoading || isGroupProjectLoading) {
    return <div>Loading...</div>;
  }

  if (isGroupError || isMembersError || isGroupProjectError) {
    return <div>Error loading group data</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-16 h-[calc(100vh-112px)]">
      <div className="col-span-9 flex flex-col gap-16">
        <GroupProjectFilter />
        <div className="">
          <GroupProjectContainer groupProject={groupProject} />
        </div>
      </div>
      <div className="col-span-3 h-full min-h-full max-h-full">
        <GroupDetails members={members} group={group} />
      </div>
    </div>
  );
}
