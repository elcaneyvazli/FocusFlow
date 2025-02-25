"use client";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLabels, useTasks } from "@/services/task.services";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInput from "@/ui/module/blocks/Input/SelectInput";
import Button from "@/ui/module/blocks/Button/Button";
import { Activity, Bookmark, LayoutDashboard, User } from "lucide-react";
import TextInputWithoutBg from "@/ui/module/blocks/Input/TextInputWithoutBg";
import * as yup from "yup";
import DateInput from "@/ui/module/blocks/Calendar/DateInput";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import { createProjectTask } from "@/services/project.services";

dayjs.extend(utc);

const TaskSchema = yup.object().shape({
  taskTitle: yup.string().required("Title is required"),
  taskDescription: yup.string().required("Description is required"),
  taskLabel: yup.string().required("Label is required"),
});

export default function NewProjectTaskForm({ onClose, project, groupId, projectId, mutate }) {
  const { labels, mutate: labelsMutate } = useLabels();
  const { mutate: tasksMutate } = useTasks();
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const titleInputRef = useRef(null);

  const mobileValue = useScreenWidth(768);

  const [labelValue, setLabelValue] = useState("");
  const [columnValue, setColumnValue] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [assignValue, setAssignValue] = useState("");
  const options = ["Must Have", "Should Have", "Could Have", "Won't Have"];
  const activity = ["Backlog", "To Do", "In Progress", "Done"];
  const userOptions = project.users.map((user) => user.username);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(TaskSchema),
  });

  const priorityMap = {
    "Must Have": 0,
    "Should Have": 1,
    "Could Have": 2,
    "Won't Have": 3,
  };

  const statusMap = {
    Backlog: 0,
    "To Do": 1,
    "In Progress": 2,
    Done: 3,
  };

  const onSubmit = async (data) => {
    if (!groupId || !projectId) {
      dispatch(
        addToast({
          title: "Error",
          message: "Missing group or project ID",
          variant: "error",
        })
      );
      return;
    }

    const taskData = {
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate.toISOString(),
      priority: priorityMap[columnValue],
      status: statusMap[activityValue],
      usernamesOrEmails: assignValue ? [assignValue] : []
    };

    try {
      await createProjectTask(groupId, projectId, taskData, mutate); // Use the passed mutate function
      dispatch(
        addToast({
          title: "Success",
          message: `${data.taskTitle} has been created successfully`,
          variant: "success",
        })
      );
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      dispatch(
        addToast({
          title: "Error",
          message: "Failed to create task",
          variant: "error",
        })
      );
    }
  };

  const handleLabelChange = (value) => {
    setLabelValue(value);
    setValue("taskLabel", value);
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

  const titleValue = watch("taskTitle", "");
  const descriptionValue = watch("taskDescription", "");

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

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[75%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="flex flex-col gap-16 px-16 py-16 ">
        <div className="flex flex-col gap-8 items-start relative">
          <TextInputWithoutBg
            placeholder="Add task title"
            value={titleValue}
            register={register}
            registername="taskTitle"
            error={errors?.taskTitle?.message}
            onChange={(e) => setValue("taskTitle", e.target.value)}
            textSize="text-2xl"
            inputRef={titleInputRef}
          />
          <TextInputWithoutBg
            placeholder="Add task description"
            value={descriptionValue}
            register={register}
            registername="taskDescription"
            error={errors?.taskDescription?.message}
            onChange={(e) => setValue("taskDescription", e.target.value)}
            textSize="text-sm"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-16">
          <SelectInput
            data={activity}
            value={activityValue}
            setValue={setActivityValue}
            inputEnabled={false}
            label="Select Priority"
            icon={<LayoutDashboard className="text-light" size={18} />}
            size="medium"
            type="base"
          />
          <DateInput
            title="Due date"
            defaultValue={dayjs().format("YYYY-MM-DD")}
            onSelect={(date) => {
              setSelectedDate(date);
            }}
          />
          <SelectInput
            data={options}
            value={columnValue}
            setValue={setColumnValue}
            inputEnabled={false}
            label="Select Priority"
            icon={<Activity className="text-light" size={18} />}
            size="medium"
            type="base"
          />
          <SelectInput
            data={userOptions}
            value={assignValue}
            setValue={setAssignValue}
            inputEnabled={false}
            label="Select User"
            icon={<User className="text-light" size={18} />}
            size="medium"
            type="base"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-border px-16 py-16 xs:gap-32 gap-16 min-w-full">
        <SelectInput
          register={register}
          errors={errors}
          data={labels}
          value={labelValue}
          setValue={handleLabelChange}
          inputEnabled={true}
          icon={<Bookmark className="text-light" size={18} />}
          registername="taskLabel"
          size="medium"
          type="base"
          dropdownPosition={mobileValue ? "above" : "below"}
        />
        <div className="flex flex-row items-center justify-between md:justify-normal gap-16 w-full md:w-fit">
          <Button text="Cancel" onClick={onClose} type="base" />
          <Button text="New Task" type="primary" />
        </div>
      </div>
    </motion.form>
  );
}
