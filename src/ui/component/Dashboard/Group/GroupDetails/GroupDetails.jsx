import React from "react";
import GroupMembers from "./GroupMembers";
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  DocumentIcon,
  IdentificationIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { IndentIcon } from "lucide-react";

export default function GroupDetails({ members, group }) {
  return (
    <div className="h-full min-h-full max-h-full w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border px-16 py-12 flex flex-col gap-16 rounded-main overflow-hidden">
      <div className="flex flex-col gap-12">
        <h1 className="text-primary dark:text-input-bg text-lg">Group Info</h1>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12">
          <div className="flex flex-row items-center gap-4">
            <IdentificationIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light">
              Group name
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-primary dark:text-input-bg text-sm font-medium">
              {group.name}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12 gap-16">
          <div className="flex flex-row items-center gap-4">
            <DocumentIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light whitespace-nowrap">
              Group description
            </p>
          </div>
          <div className="flex flex-row items-center gap-4 w-full line-clamp-1">
            <p className="text-primary dark:text-input-bg text-sm font-medium line-clamp-1 text-right w-full">
              {group.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12">
          <div className="flex flex-row items-center gap-4">
            <UserIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light">
              Creator
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-primary dark:text-input-bg text-sm font-medium">
              {group.creatorName}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12">
          <div className="flex flex-row items-center gap-4">
            <CalendarIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light">
              Date of creation
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-primary dark:text-input-bg text-sm font-medium">
              {new Date(group.createdDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12">
          <div className="flex flex-row items-center gap-4">
            <UserGroupIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light">
              Number of members
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-primary dark:text-input-bg text-sm font-medium">
              {group.membersCount}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-input-border dark:border-dark-input-border pb-12">
          <div className="flex flex-row items-center gap-4">
            <ClipboardDocumentListIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-primary dark:text-input-bg text-sm font-light">
              Total projects
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-primary dark:text-input-bg text-sm font-medium">
              {group.projectsCount}
            </p>
          </div>
        </div>
      </div>
      <GroupMembers members={members} />
    </div>
  );
}
