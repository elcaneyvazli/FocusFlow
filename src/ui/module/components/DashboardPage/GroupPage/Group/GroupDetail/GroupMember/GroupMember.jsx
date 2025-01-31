import Avvvatars from "avvvatars-react";
import React from "react";

export default function GroupMember({ member, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-row gap-8 w-full animate-pulse">
        <div className="w-32 h-32 bg-background border border-border animate-pulse rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="w-32 h-12  animate-pulse bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-64 h-16  animate-pulse bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-8 w-full ">
      <Avvvatars size={32} value={member.username} />
      <div className="flex flex-col gap-4">
        <p className="text-light text-xs leading-none">{member.roleName}</p>
        <p className="text-text text-md leading-none">{member.username}</p>
      </div>
    </div>
  );
}
