"use client";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLabels, updateTask, useTasks } from "@/services/task.services";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectInput from "@/ui/module/blocks/Input/SelectInput";
import Button from "@/ui/module/blocks/Button/Button";
import { Activity, Bookmark, LayoutDashboard } from "lucide-react";
import TextInputWithoutBg from "@/ui/module/blocks/Input/TextInputWithoutBg";
import * as yup from "yup";
import DateInput from "@/ui/module/blocks/Calendar/DateInput";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";

dayjs.extend(utc);

const TaskSchema = yup.object().shape({
  editTitle: yup.string().required("Title is required"),
  editDescription: yup.string().required("Description is required"),
  editLabel: yup.string().required("Label is required"),
});

export default function EditTaskForm({ onClose, task }) {
  const { labels, mutate: labelsMutate } = useLabels();
  const { mutate: tasksMutate } = useTasks();
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const mobileValue = useScreenWidth(768);

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

  // Initialize state with existing task data
  const [labelValue, setLabelValue] = useState(task?.label || "");
  const [columnValue, setColumnValue] = useState(
    Object.keys(priorityMap).find(
      (key) => priorityMap[key] === task?.priority
    ) || ""
  );
  const [activityValue, setActivityValue] = useState(
    Object.keys(statusMap).find((key) => statusMap[key] === task?.status) || ""
  );
  const [selectedDate, setSelectedDate] = useState(dayjs(task?.dueDate));
  console.log("NewTaskForm -> selectedDate", selectedDate);
  const options = ["Must Have", "Should Have", "Could Have", "Won't Have"];
  const activity = ["Backlog", "To Do", "In Progress", "Done"];
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: {
      editTitle: task?.title || "",
      editDescription: task?.description || "",
      editLabel: task?.label || "",
    },
  });

  const onSubmit = async (data) => {
    const taskData = {
      title: data.editTitle,
      description: data.editDescription,
      label: data.editLabel,
      dueDate: selectedDate.format("YYYY-MM-DD"),
      priority: priorityMap[columnValue],
      status: statusMap[activityValue],
    };

    try {
      await updateTask({ taskId: task.id, updatedData: taskData });
      tasksMutate();
      labelsMutate();
      dispatch(
        addToast({
          title: "Task Updated",
          message: `${data.editTitle} has been updated successfully`,
          variant: "success",
        })
      );
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      dispatch(
        addToast({
          title: "Error",
          message: "Failed to update task",
          variant: "error",
        })
      );
    }
  };

  const handleLabelChange = (value) => {
    setLabelValue(value);
    setValue("editLabel", value);
  };

  const titleValue = watch("editTitle", "");
  const descriptionValue = watch("editDescription", "");

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
    if (task) {
      setValue("editTitle", task.title);
      setValue("editDescription", task.description);
      setValue("editLabel", task.label);
      setLabelValue(task.label);
      setColumnValue(
        Object.keys(priorityMap).find(
          (key) => priorityMap[key] === task.priority
        )
      );
      setActivityValue(
        Object.keys(statusMap).find((key) => statusMap[key] === task.status)
      );
      setSelectedDate(dayjs(task.dueDate).utc());
    }
  }, [task, setValue]);

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] md:h-fit bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
      initial={{ scale: 0, rotate: "8.5deg" }}
      animate={{ scale: 1, rotate: "0deg" }}
    >
      <div className="flex flex-col gap-16 px-16 py-16 ">
        <div className="flex flex-col gap-8 items-start relative">
          <TextInputWithoutBg
            placeholder="Add task title"
            value={titleValue}
            register={register}
            registername="editTitle"
            error={errors?.editTitle?.message}
            onChange={(e) => setValue("editTitle", e.target.value)}
            textSize="text-2xl"
          />
          <TextInputWithoutBg
            placeholder="Add task description"
            value={descriptionValue}
            register={register}
            registername="editDescription"
            error={errors?.editDescription?.message}
            onChange={(e) => setValue("editDescription", e.target.value)}
            textSize="text-sm"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-16">
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
            defaultValue={task.dueDate}
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
          registername="editLabel"
          size="medium"
          type="base"
          dropdownPosition={mobileValue ? "above" : "below"}
        />
        <div className="flex flex-row items-center justify-between md:justify-normal gap-16 w-full md:w-fit">
          <Button text="Cancel" onClick={onClose} type="base" />
          <Button text="Update Task" type="primary" />
        </div>
      </div>
    </motion.form>
  );
}
