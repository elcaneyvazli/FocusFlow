"use client";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLabels, createTask, useTasks } from "@/services/task.services";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInput from "@/ui/module/blocks/Input/SelectInput";
import Button from "@/ui/module/blocks/Button/Button";
import { Activity, Bookmark, LayoutDashboard } from "lucide-react";
import TextInputWithoutBg from "@/ui/module/blocks/Input/TextInputWithoutBg";
import * as yup from "yup";
import DateInput from "@/ui/module/blocks/Calendar/DateInput";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";

const TaskSchema = yup.object().shape({
  taskTitle: yup.string().required("Title is required"),
  taskDescription: yup.string().required("Description is required"),
  taskLabel: yup.string().required("Label is required"),
});

export default function NewTaskForm({ onClose }) {
  const { labels, mutate: labelsMutate } = useLabels();
  const { mutate: tasksMutate } = useTasks();
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const mobileValue = useScreenWidth(768);

  const [labelValue, setLabelValue] = useState("");
  const [columnValue, setColumnValue] = useState("");
  const [activityValue, setActivityValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  console.log("NewTaskForm -> selectedDate", selectedDate);
  const options = ["Must Have", "Should Have", "Could Have", "Won't Have"];
  const activity = ["To Do", "In Progress", "Done"];
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
    "To Do": 0,
    "In Progress": 1,
    Done: 2,
  };

  const onSubmit = async (data) => {
    const taskData = {
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate.toISOString(),
      priority: priorityMap[columnValue],
      status: statusMap[activityValue],
      isCompleted: false,
    };

    try {
      await createTask(taskData, tasksMutate); // Pass mutate function here
      labelsMutate();
      dispatch(addToast({
        title: "Task Created",
        message: `${data.taskTitle} has been created successfully`,
        variant: "success",
      }));
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      dispatch(addToast({
        title: "Error",
        message: "Failed to create task",
        variant: "error",
      }));
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

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      {...formMotionProps}
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
        <div className="flex flex-col md:flex-row justify-center gap-16">
          <SelectInput
            data={options}
            value={columnValue}
            setValue={setColumnValue}
            inputEnabled={false}
            label="Select Priority"
            icon={<LayoutDashboard className="text-light" size={18} />}
            size="medium"
            type="base"
          />
          <DateInput
            title="Due date"
            onSelect={(date) => {
              setSelectedDate(date);
            }}
          />
          <SelectInput
            data={activity}
            value={activityValue}
            setValue={setActivityValue}
            inputEnabled={false}
            label="Select Priority"
            icon={<Activity className="text-light" size={18} />}
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
