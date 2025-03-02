"use client";
import React from "react";
import GroupDetailCard from "./GroupDetailCard";
import {
  Atom,
  Calendar,
  Component,
  Contact,
  Settings2,
  Text,
  UsersRound,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useGroupById, useUserRole } from "@/services/group.services";
import { motion } from "motion/react";
import {
  setToggleGroupDetail,
  setToggleGroupSettings,
} from "@/redux/features/GroupSlice/GroupSlice";
import { useDispatch } from "react-redux";
import Button from "@/ui/module/blocks/Button/Button";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";

export default function GroupDetailCardContainer() {
  const { id } = useParams();
  const { group, isLoading: groupLoading } = useGroupById(id);
  const { role, isLoading: roleLoading } = useUserRole(id);
  const dispatch = useDispatch();
  const mobile = useScreenWidth(640);

  const isAdmin = role === "Admin";
  const isLoading = groupLoading || roleLoading;

  const date = new Date(group?.createdDate).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const icon = [
    {
      name: "Group name",
      icon: <Component size={18} className="text-text" strokeWidth={1.8} />,
      description: group?.name,
    },
    {
      name: "Group description",
      icon: <Text size={18} className="text-text" strokeWidth={1.8} />,
      description: group?.description,
    },
    {
      name: "Creator",
      icon: <Contact size={18} className="text-text" strokeWidth={1.8} />,
      description: group?.creatorName,
    },
    {
      name: "Date of creation",
      icon: <Calendar size={18} className="text-text" strokeWidth={1.8} />,
      description: date,
    },
    {
      name: "Number of members",
      icon: <UsersRound size={18} className="text-text" strokeWidth={1.8} />,
      description: group?.membersCount,
    },
    {
      name: "Number of Project",
      icon: <Atom size={18} className="text-text" strokeWidth={1.8} />,
      description: group?.projectsCount,
    },
  ];
  return (
    <motion.div
      className="flex flex-col gap-24"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg text-text font-semibold">Group Information</h1>
        <div className="flex flex-row items-center gap-8">
          <Button
            type={mobile ? "icon-primary" : "primary"}
            icon={<Settings2 size={18} className="text-white" />}
            size="small"
            text={mobile ? "" : "Edit Group"}
            iconPosition="right"
            onClick={() =>
              !isLoading && isAdmin && dispatch(setToggleGroupSettings())
            }
            disabled={isLoading || !isAdmin}
          />
          <button
            onClick={() => dispatch(setToggleGroupDetail())}
            className="block xl:hidden"
          >
            <X size={18} className="text-text" strokeWidth={1.8} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        {icon.map((item, index) => (
          <GroupDetailCard
            key={index}
            icon={item.icon}
            name={item.name}
            description={item.description}
            isLoading={isLoading}
          />
        ))}
      </div>
    </motion.div>
  );
}
