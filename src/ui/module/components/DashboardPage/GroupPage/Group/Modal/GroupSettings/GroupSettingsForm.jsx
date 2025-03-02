import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  useGroupMember,
  removeGroupMember,
  useGroupById,
  updateGroup,
} from "@/services/group.services";
import { Target, Text, Trash2 } from "lucide-react";
import Button from "@/ui/module/blocks/Button/Button";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { openDialog } from "@/redux/features/DialogSlice/DialogSlice";
import { setToggleGroupSettings } from "@/redux/features/GroupSlice/GroupSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/ui/module/blocks/Input/Input";

const validationSchema = yup.object().shape({
  name: yup.string().required("Group name is required"),
  description: yup.string().required("Group description is required"),
});

export default function GroupSettingsForm({ onClick }) {
  const { id } = useParams();
  const { member, mutate: memberMutate } = useGroupMember(id);
  const { group, mutate: groupMutate } = useGroupById(id);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: group?.name,
      description: group?.description,
    },
  });

  const handleRemoveMember = async (username) => {
    try {
      await removeGroupMember(id, username, memberMutate);
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

  const handleDeleteGroup = () => {
    dispatch(
      openDialog({
        title: "Delete Group",
        message:
          "Are you sure you want to delete this group? This action cannot be undone.",
        variant: "error",
        dialogType: "deleteGroup",
        data: {
          groupId: id,
          onSuccess: () => {
            dispatch(setToggleGroupSettings());
            router.push("/dashboard/group");
          },
        },
      })
    );
  };

  const onSubmit = async (data) => {
    try {
      await updateGroup(id, data);
      await groupMutate();
      dispatch(
        addToast({
          title: "Success",
          message: "Group updated successfully",
          variant: "success",
        })
      );
      dispatch(setToggleGroupSettings());
    } catch (error) {
      dispatch(
        addToast({
          title: "Error",
          message: error.message || "Failed to update group",
          variant: "error",
        })
      );
    }
  };

  return (
    <motion.div
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="flex flex-col gap-12 p-16">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-lg font-semibold text-text">Group Setting</h2>
        </div>

        <form
          className="flex flex-col gap-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            title="Group Name"
            placeholder="Enter group name"
            register={register}
            registername="name"
            error={errors.name?.message}
            icon={<Target size={16} className="text-text" />}
            required={true}
          />
          <Input
            title="Group Description"
            placeholder="Enter group description"
            register={register}
            registername="description"
            error={errors.description?.message}
            required={true}
            icon={<Text size={16} className="text-text" />}
          />
        </form>

        <div className="flex flex-col gap-8 overflow-y-auto">
          <h2 className="text-lg font-semibold text-text">Group Members</h2>
          {member.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-8 bg-elevation border border-border rounded-md"
            >
              <span className="text-text">{user.username}</span>
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

      <div className="flex flex-row items-center justify-between p-12 border-t border-border">
        <Button
          type="primary"
          color="error"
          text="Delete Group"
          onClick={handleDeleteGroup}
          size="small"
        />
        <div className="flex flex-row items-center gap-12">
          <Button type="base" text="Cancel" onClick={onClick} />
          <Button type="primary" text="Save" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </motion.div>
  );
}
