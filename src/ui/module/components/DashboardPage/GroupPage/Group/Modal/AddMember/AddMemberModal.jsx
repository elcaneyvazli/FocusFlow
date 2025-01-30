import React from "react";
import { useDispatch } from "react-redux";
import AddMemberForm from "./AddMemberForm";
import { setToggleNewMember } from "@/redux/features/GroupSlice/GroupSlice";
import { useAppSelector } from "@/redux/store";
import { motion } from "motion/react";

export default function AddMemberModal() {
  const dispath = useDispatch();
  const NewMember = useAppSelector((state) => state.group.newMember);

  return NewMember ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
        onClick={() => dispath(setToggleNewMember())}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <AddMemberForm onClick={() => dispath(setToggleNewMember())} />
    </div>
  ) : null;
}
