"use client";
import { useGroupMember } from "@/services/group.services";
import Button from "@/ui/module/blocks/Button/Button";
import { CirclePlus, Settings2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import GroupMember from "./GroupMember";
import { useDispatch } from "react-redux";
import { setToggleNewMember } from "@/redux/features/GroupSlice/GroupSlice";
import { motion } from "motion/react";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";

export default function GroupMemberContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { member, isError, isLoading } = useGroupMember(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <motion.div
      className="flex flex-col gap-8 h-full overflow-y-auto"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-row items-center justify-between py-8">
        <h1 className="text-lg text-text font-medium leading-none">
          Group Members
        </h1>
        <div className="flex flex-row items-center gap-8">
          <Button
            type="icon-primary"
            icon={<CirclePlus size={18} className="text-white" />}
            size="small"
            onClick={() => dispatch(setToggleNewMember())}
          />
          <Button
            type="icon-solid"
            icon={<Settings2 size={18} className="text-text" />}
            size="small"
          />
        </div>
      </div>
      <div className="flex flex-col gap-12 overflow-y-auto h-full">
        {member.map((member) => (
          <GroupMember key={member.id} member={member} isLoading={isLoading} />
        ))}
      </div>
    </motion.div>
  );
}
