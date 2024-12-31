import { useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  addGroupProject,
  createGroup,
  toggleAddGroupModal,
  toggleAddProjectModal,
  useGroupProject,
} from "@/redux/features/GroupSlice/GroupSlice";
import { useDispatch } from "react-redux";
import useScreenWidth from "@/utils/useScreenWidth";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TagIcon } from "lucide-react";
import Button from "@/ui/block/button/Button/Button";
import { GroupSchema, ProjectSchema } from "@/schema/schema";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { v4 as uuidv4 } from "uuid";
import { useSWRConfig } from "swr";
import { useGroups } from "@/redux/features/GroupSlice/GroupSlice";
import PrimaryButton from "@/ui/block/button/Button/PrimaryButton";
import { useParams } from "next/navigation";

export default function NewProjectModal() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(ProjectSchema),
  });

  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const { addProjectModal } = useAppSelector((state) => state.group);
  const { mutate: mutateGroups } = useGroupProject();

  const toggleModal = () => {
    dispatch(toggleAddProjectModal());
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    const projectData = {
      name: data.projectName,
      description: data.projectDescription,
    };
    console.log("Project Data:", projectData);
    try {
      const newProject = await dispatch(
        addGroupProject({ projectData, id })
      ).unwrap();
      dispatch(
        addToast({
          id: uuidv4(),
          title: "Success",
          message: `Project "${projectData.name}" created successfully`,
          variant: "success",
        })
      );
      mutateGroups();
      reset();
      toggleModal();
      console.log("New Project:", newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      dispatch(
        addToast({
          id: uuidv4(),
          title: "Error",
          message: "Error creating project. Please try again.",
          variant: "error",
        })
      );
      toggleModal();
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = useScreenWidth(768);
  const formMotionProps = isMobile
    ? {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { scale: 0, rotate: "8.5deg" },
        animate: { scale: 1, rotate: "0deg" },
        exit: { scale: 0, rotate: "0deg" },
      };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)(event);
    }
  };

  return addProjectModal ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40 backdrop-blur-sm"
        onClick={toggleModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <motion.form
        className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col gap-16 md:justify-normal justify-between"
        {...formMotionProps}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col gap-12 pt-16 pb-8 px-16">
          <TextInput
            placeholder="Name"
            icon={<UserGroupIcon className="w-[18px] h-[18px] text-light" />}
            registername="projectName"
            error={errors.name?.message}
            register={register}
            title="Project Name"
          />
          <TextInput
            placeholder="Description"
            icon={<TagIcon className="w-[18px] h-[18px] text-light" />}
            registername="projectDescription"
            error={errors.description?.message}
            register={register}
            title="Project Description"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-16 w-full py-16 px-12 border-t border-input-border dark:border-dark-input-border">
          <PrimaryButton
            text="Cancel"
            width="fit"
            onClick={toggleModal}
            type="button"
          />
          <PrimaryButton
            text={isLoading ? "Creating..." : "Create Project"}
            color="green"
            variant="color"
            width="fit"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </motion.form>
    </div>
  ) : null;
}
