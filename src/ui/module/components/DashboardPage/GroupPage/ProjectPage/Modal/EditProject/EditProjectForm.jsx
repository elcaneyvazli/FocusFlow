import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { Target, Text } from "lucide-react";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { updateProject } from "@/services/project.services";

const validationSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().required("Project description is required"),
});

export default function EditProjectForm({ onClose, project, groupId, projectId, mutate }) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateProject(groupId, projectId, data);
      await mutate();
      dispatch(
        addToast({
          title: "Success",
          message: "Project updated successfully",
          variant: "success",
        })
      );
      onClose();
    } catch (error) {
      dispatch(
        addToast({
          title: "Error",
          message: error.message || "Failed to update project",
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
          Edit Project
        </h2>
        <form className="flex flex-col gap-16">
          <Input
            title="Project Name"
            placeholder="Enter project name"
            register={register}
            registername="name"
            error={errors.name?.message}
            icon={<Target size={16} className="text-text" />}
            required={true}
          />
          <Input
            title="Project Description"
            placeholder="Enter project description"
            register={register}
            registername="description"
            error={errors.description?.message}
            icon={<Text size={16} className="text-text" />}
            required={true}
          />
        </form>
      </div>

      <div className="flex flex-row items-center justify-end gap-8 border-t border-border p-16">
        <Button text="Cancel" onClick={onClose} type="base" />
        <Button text="Save Changes" onClick={handleSubmit(onSubmit)} type="primary" />
      </div>
    </motion.div>
  );
}
