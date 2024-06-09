import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toggleTask } from "@/redux/features/NewTaskSlice/newTaskSlice";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";
import { useForm } from "react-hook-form";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import { TaskSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/block/button/Button/Button";
import { createTask } from "@/services/task/task.services";

export default function NewTaskModul() {
  const dispatch = useDispatch();

  const taskValue = useAppSelector(
    (state) => state.newTaskReducer.value.newTask
  );

  const onClose = () => {
    dispatch(toggleTask());
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(TaskSchema),
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState(0); // Default to 0

  const handleSelectChange = (value) => {
    setSelectedPriority(value);
  };

  const onTaskCreated = async (data, e) => {
    e.preventDefault();

    const taskData = {
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate.toISOString(),
      taskPriority: selectedPriority, // Send the index
      isCompleted: false,
    };

    try {
      const response = await createTask(taskData);
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return taskValue ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full md:h-screen flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
        <div className="relative w-full h-full md:w-[70%] md:h-auto bg-white dark:bg-primary px-16 py-16 rounded-main flex flex-col gap-16 justify-between z-50">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg font-medium text-primary dark:text-input-bg">
              New Task
            </h1>
            <ButtonWithIcon
              icon={
                <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
              }
              onClick={onClose}
            />
          </div>
          <form
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(onTaskCreated)}
          >
            <TextInput
              title="Task title"
              placeholder="Add Task Title"
              register={register}
              registername={"taskTitle"}
              error={errors.taskTitle?.message}
              icon={
                <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInput
              title="Task description"
              placeholder="Add Task Description"
              register={register}
              registername={"taskDescription"}
              error={errors.taskDescription?.message}
              icon={
                <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <DateInput
              title="Due date"
              onSelect={(date) => {
                setSelectedDate(date);
              }}
            />
            <TextInput
              title="Label"
              placeholder="Add Task Label"
              register={register}
              registername={"taskLabel"}
              error={errors.taskLabel?.message}
              icon={<TagIcon className="w-[18px] h-[18px] text-light" />}
            />
            <CustomSelect
              options={["Must Have", "Should Have", "Could Have", "Won't Have"]}
              onChange={handleSelectChange}
            />
            <Button text="Add Task" />
          </form>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}
