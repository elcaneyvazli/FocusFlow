"use client";
import {
  useGroupById,
  useGroupMembers,
} from "@/redux/features/GroupSlice/GroupSlice";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import GroupMembers from "@/ui/component/Dashboard/Group/GroupDetails/GroupMembers";
import GroupDetails from "@/ui/component/Dashboard/Group/GroupDetails/GroupDetails";

const Breadcrumb = dynamic(() => import("@/ui/block/breadcrumb/breadcrumb"), {
  loading: () => (
    <div className="flex flex-row gap-16 items-center animate-pulse bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border w-fit rounded-main px-12 py-4">
      <div className="min-w-64 min-h-12 w-64 h-12 bg-gray-600 animate-pulse rounded-main"></div>
      <ChevronRightIcon className="h-16 w-16 text-primary dark:text-input-bg" />
      <div className="min-w-64 min-h-12 w-64 h-12 bg-gray-600 animate-pulse rounded-main"></div>
    </div>
  ),
  ssr: false,
});

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

  if (isGroupLoading || isMembersLoading) {
    return <div>Loading...</div>;
  }

  if (isGroupError || isMembersError) {
    return <div>Error loading group data</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-16 h-[calc(100vh-112px)]">
      <div className="col-span-9">
        {/* <Breadcrumb
          items={[
            {
              label: "Group",
              icon: (
                <UserGroupIcon className="h-16 w-16 text-primary dark:text-input-bg" />
              ),
              link: "/dashboard/group",
            },
            {
              label: group?.name,
              link: `/dashboard/group/${id}`,
            },
          ]}
        /> */}
        <h2 className="text-primary dark:text-input-bg">{group?.name}</h2>
        <p className="text-primary dark:text-input-bg">{group?.description}</p>
      </div>
      <div className="col-span-3 h-full min-h-full max-h-full">
        <GroupDetails members={members} group={group} />
      </div>
    </div>
  );
}
