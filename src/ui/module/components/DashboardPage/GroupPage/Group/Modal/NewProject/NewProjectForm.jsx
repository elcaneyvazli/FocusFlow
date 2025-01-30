import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Button from "@/ui/module/blocks/Button/Button";
import Input from "@/ui/module/blocks/Input/Input";
import { Target, Text, Users } from "lucide-react";
import { createGroup, useGroup } from "@/services/group.services";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  setToggleGroup,
  setToggleProject,
} from "@/redux/features/GroupSlice/GroupSlice";
import { useParams } from "next/navigation";
import { createProject, useAllProject } from "@/services/project.services";

const validationSchema = yup.object().shape({
  projectName: yup.string().required("Project Name is required"),
  projectDescription: yup.string().required("project Description is required"),
});

export default function NewProjectForm() {
  const formRef = useRef(null);
  const { id } = useParams();
  const { mutate, isLoading, isError } = useAllProject(id);
  const dispatch = useDispatch();

  console.log(id);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createProject(
        {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          groupId: id,
        },
        mutate
      );
      dispatch(setToggleProject());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleSubmit, onSubmit]);
  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="p-12 flex flex-col gap-12">
        <Input
          icon={<Target size={16} className="text-text" />}
          placeholder={"Name"}
          title="Project Name"
          registername="projectName"
          error={errors.projectName?.message}
          register={register}
          required={true}
        />
        <Input
          icon={<Text size={16} className="text-text" />}
          placeholder={"Description"}
          title="Project Description"
          registername="projectDescription"
          error={errors.projectDescription?.message}
          register={register}
          required={true}
        />
      </div>
      <div className="flex flex-row items-center justify-between p-12 border-t border-border">
        <Button
          type="base"
          text="Cancel"
          onClick={() => dispatch(setToggleGroup())}
          disabled={isLoading}
        />
        <Button
          type="primary"
          text={isLoading ? "Creating..." : "New Project"}
          disabled={isLoading}
        />
      </div>
    </motion.form>
  );
}
