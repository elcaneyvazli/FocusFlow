import React, { useState } from "react";
import { motion } from "framer-motion";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import { useGroupMember } from "@/services/group.services";
import { useParams } from "next/navigation";
import SelectInput from "@/ui/module/blocks/Input/SelectInput";
import { Trash2, User } from "lucide-react";
import Button from "@/ui/module/blocks/Button/Button";
import { addProjectMember, removeProjectMember } from "@/services/project.services";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { useDispatch } from "react-redux";

export default function AddMemberForm({
  onClose,
  member,
  project,
  groupId,
  projectId,
  mutate,
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedMember, setSelectedMember] = useState("");

  const isMobile = useScreenWidth(768);

  const memberUsernames = member?.map((m) => m.username) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      dispatch(
        addToast({
          title: "Error",
          message: "Please select a member to add",
          variant: "error",
        })
      );
      return;
    }

    try {
      await addProjectMember(groupId, projectId, selectedMember, mutate);
      dispatch(
        addToast({
          title: "Success",
          message: "Member added successfully",
          variant: "success",
        })
      );
      onClose();
    } catch (error) {
      dispatch(
        addToast({
          title: "Error",
          message: error.message || "Failed to add member",
          variant: "error",
        })
      );
    }
  };

  const handleRemoveMember = async (username) => {
    try {
      await removeProjectMember(groupId, projectId, username, mutate);
      dispatch(
        addToast({
          title: "Success",
          message: "Member removed successfully",
          variant: "success",
        })
      );
    } catch (error) {
      dispatch(
        addToast({
          title: "Error",
          message: error.message || "Failed to remove member",
          variant: "error",
        })
      );
    }
  };

  return (
    <motion.div
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[75%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="flex flex-col gap-12 p-16">
        <h2 className="text-lg font-semibold text-text leading-none">
          Add Member to Project
        </h2>
        <SelectInput
          data={memberUsernames}
          value={selectedMember}
          setValue={setSelectedMember}
          inputEnabled={false}
          label="Select Member"
          icon={<User className="text-light" size={18} />}
          size="medium"
          type="base"
          dropdownPosition={isMobile ? "above" : "below"}
        />
        <div className="flex flex-col gap-8 overflow-y-auto">
          <h2 className="text-lg font-semibold text-text leading-none">
            Project Members
          </h2>
          {project.users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-8 bg-elevation border border-border rounded-md"
            >
              <p className="text-text text-md leading-none">{user.username}</p>
              <Button
                type="icon-primary"
                color={"error"}
                icon={<Trash2 size={18} />}
                onClick={() => handleRemoveMember(user.username)}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-8 border-t border-border p-16">
        <Button text="Cancel" onClick={onClose} type="base" />
        <Button text="Add Member" type="primary" onClick={handleSubmit} />
      </div>
    </motion.div>
  );
}
