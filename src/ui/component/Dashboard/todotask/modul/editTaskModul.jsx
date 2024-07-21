import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { updateTask } from "@/services/task/task.services";
import { toggleEditTask } from "@/redux/features/EditTaskSlice/EditTaskSlice";
import { TaskSchema } from "@/schema/schema";
import Button from "@/ui/block/button/Button/Button";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import LabelInput from "@/ui/block/input/LabelInput/LabelInput";
import { getLabel } from "@/services/task/label.services";

export default function EditTaskModul({ task, edit, setEdit }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [label, setLabel] = useState([]);
  const [error, setError] = useState(null);
  const [labelShow, setLabelShow] = useState(false);
  const [labelValue, setLabelValue] = useState(task?.label || "");
  const [selectedDate, setSelectedDate] = useState(task.dueDate || null);
  const [selectedPriority, setSelectedPriority] = useState(task.priority || 0);
  const [selectedStatus, setSelectedStatus] = useState(task.status || 0);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: {
      taskTitle: task?.title || "",
      taskDescription: task?.description || "",
      taskLabel: task?.label || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLabel();
        setLabel(response);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue("taskLabel", labelValue);
  }, [labelValue, setValue]);

  const onEditTask = () => {
    dispatch(toggleEditTask());
    setEdit(null);
  };

  const onTaskEdited = async (data) => {
    const updatedTaskData = {
      ...task,
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate,
      priority: selectedPriority,
      status: selectedStatus,
    };

    try {
      await updateTask(task.id, updatedTaskData);
      onEditTask();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return edit ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40"
        onClick={onEditTask}
      ></div>
      <form
        className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col md:justify-normal justify-between"
        onSubmit={handleSubmit(onTaskEdited)}
      >
        <div className="flex flex-col gap-16 px-16 py-16">
          <div className="flex flex-col gap-0 items-start">
            <TextInputWithoutBg
              title="Task title"
              placeholder="Add Task Title"
              text="2xl"
              color="primary"
              darkcolor="input-bg"
              register={register}
              registername="taskTitle"
              error={errors.taskTitle?.message}
              icon={
                <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInputWithoutBg
              title="Task description"
              placeholder="Add Task Description"
              text="lg"
              color="light"
              register={register}
              registername="taskDescription"
              error={errors.taskDescription?.message}
              icon={
                <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
              }
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-16">
            <CustomSelect
              options={["Must Have", "Should Have", "Could Have", "Won't Have"]}
              onChange={setSelectedPriority}
              defaultValue={task.priority}
            />
            <DateInput onSelect={setSelectedDate} defaultValue={task.dueDate} />
            <CustomSelect
              options={["Todo", "In Progress", "Done"]}
              onChange={setSelectedStatus}
              defaultValue={task.status}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-input-border dark:border-dark-input-border px-16 py-16 xs:gap-32 gap-16 w-full">
          <LabelInput
            register={register}
            errors={errors}
            setValue={setValue}
            labels={label}
            labelValue={labelValue}
            setLabelValue={setLabelValue}
            labelShow={labelShow}
            setLabelShow={setLabelShow}
          />
          <div className="flex flex-row items-center justify-between md:justify-normal gap-16 w-full md:w-fit">
            <Button text="Cancel" width="fit" onClick={onEditTask} />
            <Button text="Edit Task" color="blue" width="fit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
