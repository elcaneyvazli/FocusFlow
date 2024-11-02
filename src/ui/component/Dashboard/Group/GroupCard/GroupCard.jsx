import React from "react";
import { useGroups } from "@/redux/features/GroupSlice/GroupSlice";
import GroupFilter from "./GroupFilter";
import { useDispatch } from "react-redux";
import { toggleAddGroupModal } from "@/redux/features/GroupSlice/GroupSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import GroupImg from "@/ui/assert/GroupImg.svg";

const GroupCardItem = dynamic(() => import("./GroupCardItem"), {
  loading: () => <GroupCardItemSkeleton />,
  ssr: false,
});

import { GroupCardItemSkeleton } from "./GroupCardItem";

export default function GroupCard() {
  const dispatch = useDispatch();
  const { groups, isLoading, isError, mutate } = useGroups();

  const toggleModal = () => {
    dispatch(toggleAddGroupModal());
  };

  const refreshGroups = () => {
    mutate();
  };

  if (isError) return <div>Failed to load groups</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-12 gap-16">
      <GroupFilter modal={false} toggleModal={toggleModal} />
      {groups?.length === 0 ? (
        <div className="col-span-12 flex flex-col items-center justify-center gap-8">
          <Image
            src={GroupImg}
            alt="No groups"
            width={0}
          N  height={0}
            className="w-full h-[400px]"
          />
          <p className="text-light text-lg font-semibold text-center">
            Create your first group to start tracking your time
          </p>
        </div>
      ) : (
        groups?.map((item) => <GroupCardItem key={item.id} item={item} />)
      )}
    </div>
  );
}
