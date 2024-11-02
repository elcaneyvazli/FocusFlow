import { toggleAddGroupMemberModal } from "@/redux/features/GroupSlice/GroupSlice";
import Button from "@/ui/block/button/Button/Button";
import PrimaryButton from "@/ui/block/button/Button/PrimaryButton";
import {
  AdjustmentsHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import React from "react";
import { useDispatch } from "react-redux";

export default function GroupMembers({ members }) {
  const dispatch = useDispatch();

  const handleAddMember = () => {
    dispatch(toggleAddGroupMemberModal());
  };
  return (
    <div className="flex flex-col gap-16 h-full min-h-full max-h-full overflow-y-scroll">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-primary dark:text-input-bg text-lg">
          Group Members
        </h1>
        <div className="flex flex-row items-center gap-8">
          <PrimaryButton
            variant="icon-secondary"
            icon={
              <PlusCircleIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            }
            onClick={handleAddMember}
          />
          <PrimaryButton
            variant="icon-secondary"
            icon={
              <AdjustmentsHorizontalIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            }
          />
        </div>
      </div>
      <div className="h-full min-h-full max-h-full w-full overflow-y-scroll flex flex-col gap-16">
        {members?.map((member) => (
          <div key={member.id} className="flex flex-row gap-8 items-center">
            <div className="h-40 w-40 rounded-full">
              <Avvvatars
                value={member?.username}
                border={false}
                size={40}
                style="character"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-light text-sm font-normal">
                {member.roleName}
              </p>
              <h1 className="text-primary dark:text-input-bg text-md font-medium">
                {member.username}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
