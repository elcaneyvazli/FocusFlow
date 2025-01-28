"use client";
import React from "react";
import GroupDetailCard from "./GroupDetailCard";
import {
  Atom,
  Calendar,
  Component,
  Contact,
  Text,
  UsersRound,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useGroupById } from "@/services/group.services";
import { motion } from "motion/react";

export default function GroupDetailCardContainer() {
  const { id } = useParams();
  const { group, isLoading } = useGroupById(id);

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
      <h1 className="text-lg text-text font-semibold">Group Information</h1>
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
