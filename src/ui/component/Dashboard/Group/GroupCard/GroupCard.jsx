import React, { useEffect } from "react";
import GroupCardItem from "./GroupCardItem";
import GroupFilter from "./GroupFIlter";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getGroup } from "@/redux/features/GroupSlice/GroupSlice";

export default function GroupCard() {
  const dispatch = useDispatch();
  const { group } = useAppSelector((state) => state.group);
  useEffect(() => {
    dispatch(getGroup());
  }, [dispatch]);

  console.log(group);
  return (
    <div className="grid grid-cols-12 gap-16">
      <GroupFilter />
      <GroupCardItem />
      <GroupCardItem />
      <GroupCardItem />
      <GroupCardItem />
      <GroupCardItem />
      <GroupCardItem />
      <GroupCardItem />
    </div>
  );
}
