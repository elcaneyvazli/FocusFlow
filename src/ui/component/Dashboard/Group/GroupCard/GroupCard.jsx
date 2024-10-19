// import React, { useEffect, useState } from "react";
// import GroupFilter from "./GroupFilter";
// import { useAppSelector } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import {
//   getGroup,
//   toggleAddGroupModal,
// } from "@/redux/features/GroupSlice/GroupSlice";
// import dynamic from "next/dynamic";

// const GroupCardItem = dynamic(() => import("./GroupCardItem"), {
//   loading: () => <GroupCardItemSkeleton />,
//   ssr: false,
// });

// import { GroupCardItemSkeleton } from "./GroupCardItem";

// export default function GroupCard() {
//   const dispatch = useDispatch();
//   const { group, addGroupModal } = useAppSelector((state) => state.group);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     dispatch(getGroup());
//   }, [dispatch]);

//   const toggleModal = () => {
//     dispatch(toggleAddGroupModal());
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="grid grid-cols-12 gap-16">
//       <GroupFilter modal={addGroupModal} toggleModal={toggleModal} />
//       {group.map((item) => (
//         <GroupCardItem key={item.id} item={item} />
//       ))}
//     </div>
//   );
// }

import React from "react";
import useSWR from "swr";
import GroupFilter from "./GroupFilter";
import { useDispatch } from "react-redux";
import { toggleAddGroupModal } from "@/redux/features/GroupSlice/GroupSlice";
import dynamic from "next/dynamic";

const GroupCardItem = dynamic(() => import("./GroupCardItem"), {
  loading: () => <GroupCardItemSkeleton />,
  ssr: false,
});

import { GroupCardItemSkeleton } from "./GroupCardItem";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function GroupCard() {
  const dispatch = useDispatch();
  const {
    data: groups,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_KEY}/Group`, fetcher, {
    refreshInterval: 1000,
  });

  const toggleModal = () => {
    dispatch(toggleAddGroupModal());
  };

  if (error) return <div>Failed to load groups</div>;
  if (!groups) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-12 gap-16">
      <GroupFilter modal={false} toggleModal={toggleModal} />
      {
        mutate()
        ? groups.map((item) => <GroupCardItem key={item.id} item={item} />)
        : Array(groups.length)
            .fill(0)
            .map((_, index) => <GroupCardItemSkeleton key={index} />)
      }
    </div>
  );
}
