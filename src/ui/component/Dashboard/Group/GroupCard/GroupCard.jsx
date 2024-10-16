import React, { useEffect, useState } from "react";
import GroupCardItem from "./GroupCardItem";
import GroupFilter from "./GroupFilter";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getGroup } from "@/redux/features/GroupSlice/GroupSlice";

export default function GroupCard() {
  const dispatch = useDispatch();
  const { group } = useAppSelector((state) => state.group);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    dispatch(getGroup());
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
  }, [dispatch]);

  console.log(group);

  if (!mounted) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-12 gap-16">
      <GroupFilter />
      {group.map((item) => (
        <GroupCardItem key={item.id} item={item} />
      ))}
    </div>
  );
}
