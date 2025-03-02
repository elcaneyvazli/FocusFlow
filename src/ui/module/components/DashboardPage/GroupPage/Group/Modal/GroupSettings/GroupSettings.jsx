import React from "react";
import { useDispatch } from "react-redux";
import { setToggleGroupSettings } from "@/redux/features/GroupSlice/GroupSlice";
import { useAppSelector } from "@/redux/store";
import { motion } from "motion/react";
import GroupSettingsForm from "./GroupSettingsForm";
export default function GroupSettings() {
  const dispatch = useDispatch();
  const GroupSettings = useAppSelector((state) => state.group.groupSettings);
  return GroupSettings ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
        onClick={() => dispatch(setToggleGroupSettings())}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <GroupSettingsForm onClick={() => dispatch(setToggleGroupSettings())} />
    </div>
  ) : null;
}
