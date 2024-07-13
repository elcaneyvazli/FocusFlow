import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import {
  ChevronDownIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { toggleTask } from "@/redux/features/NewTaskSlice/newTaskSlice";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";
import { useForm } from "react-hook-form";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import { TaskSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/block/button/Button/Button";
import { createTask } from "@/services/task/task.services";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import TextInput from "@/ui/block/input/TextInput/TextInput";

export default function NewTaskModul() {
  const router = useRouter();
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

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedPriority, setSelectedPriority] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const handleSelectChange = (value) => {
    setSelectedPriority(value);
  };

  const handleSelectChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const onTaskCreated = async (data, e) => {
    console.log("Data:", data);
    e.preventDefault();

    const taskData = {
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate.format("YYYY-MM-DD"),
      taskPriority: selectedPriority,
      status: selectedStatus,
      isCompleted: false,
    };

    console.log("Task Data:", taskData);

    try {
      const response = await createTask(taskData);
      dispatch(
        addToast({
          id: uuidv4(),
          message: `Task "${taskData.title}" created successfully`,
        })
      );
      onClose();
      router.refresh();
      // window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return taskValue ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40"
        onClick={onClose}
      ></div>
      <form
        className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col md:justify-normal justify-between"
        onSubmit={handleSubmit(onTaskCreated)}
      >
        <div className="flex flex-col gap-16 px-16 py-16 ">
          <div className="flex flex-col gap-0 items-start">
            <TextInputWithoutBg
              title="Task title"
              placeholder="Add Task Title"
              text={"2xl"}
              color={"primary"}
              darkcolor={"input-bg"}
              register={register}
              registername={"taskTitle"}
              error={errors.taskTitle?.message}
              icon={
                <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInputWithoutBg
              title="Task description"
              placeholder="Add Task Description"
              text={"lg"}
              color={"light"}
              register={register}
              registername={"taskDescription"}
              error={errors.taskDescription?.message}
              icon={
                <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
              }
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-16">
            <CustomSelect
              options={["Must Have", "Should Have", "Could Have", "Won't Have"]}
              onChange={handleSelectChange}
            />
            <DateInput
              title="Due date"
              onSelect={(date) => {
                setSelectedDate(date);
              }}
            />
            <CustomSelect
              options={["Todo", "In Progress", "Done"]}
              onChange={handleSelectChangeStatus}
            />
          </div>
        </div>
        <div className="flex flex-col xs:flex-row items-center justify-between border-t border-input-border dark:border-dark-input-border px-16 py-16 xs:gap-32 gap-16 w-full">
          <TextInput
            title="Task label"
            placeholder="Add Task labek"
            text={"md"}
            color={"light"}
            register={register}
            registername={"taskLabel"}
            error={errors.taskLabel?.message}
            icon={<DocumentTextIcon className="w-[18px] h-[18px] text-light" />}
          />
          {/* <div className="flex flex-row items-center justify-start border border-input-bg dark:border-dark-input-border px-32 py-8 gap-4 rounded-main w-full xs:w-fit">
            <h1 className="text-sm text-primary dark:text-input-bg">Label</h1>
            <ChevronDownIcon className="h-16 w-16 text-primary dark:text-input-bg" />
          </div> */}
          <div className="flex flex-row items-center justify-between xs:justify-normal gap-16 w-full xs:w-fit">
            <Button text="Cancel" width="fit" onClick={onClose} />
            <Button text="New Task" color={"green"} width="fit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div></div>
  );
}
