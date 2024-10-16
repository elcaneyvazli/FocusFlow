import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { updateTask } from "@/redux/features/TaskSlice/TaskSlice";
import { toggleEditTask } from "@/redux/features/TaskSlice/TaskSlice";
import { TaskSchema } from "@/schema/schema";
import Button from "@/ui/block/button/Button/Button";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import LabelInput from "@/ui/block/input/LabelInput/LabelInput";
import { getLabel } from "@/services/task/label.services";
import useScreenWidth from "@/utils/useScreenWidth";

export default function EditTaskModul() {
  const editValue = useAppSelector((state) => state.tasks.editTaskButton);
  const task = useAppSelector((state) => state.tasks.editTask);

  const router = useRouter();
  const dispatch = useDispatch();
  const [label, setLabel] = useState([]);
  const [error, setError] = useState(null);
  const [labelShow, setLabelShow] = useState(false);
  const [labelValue, setLabelValue] = useState(task?.label || "");
  const [selectedDate, setSelectedDate] = useState(task?.dueDate || null);
  const [selectedPriority, setSelectedPriority] = useState(task?.priority || 0);
  const [selectedStatus, setSelectedStatus] = useState(task?.status || 0);

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
    if (task) {
      setValue("taskTitle", task.title || "");
      setValue("taskDescription", task.description || "");
      setLabelValue(task.label || "");
      setSelectedDate(task.dueDate || null);
      setSelectedPriority(task.priority || 0);
      setSelectedStatus(task.status || 0);
    }
  }, [task, setValue]);

  const onEditTask = () => {
    dispatch(toggleEditTask());
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
      await dispatch(
        updateTask({ taskId: task.id, updatedData: updatedTaskData })
      );
      onEditTask();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Error editing task:", error);
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
  if (!task) return null;

  return editValue ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[70]">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-50 backdrop-blur-sm"
        onClick={onEditTask}
      ></div>
      <motion.form
        className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col md:justify-normal justify-between"
        onSubmit={handleSubmit(onTaskEdited)}
        {...formMotionProps}
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
              variant={"component"}
            />
            <DateInput onSelect={setSelectedDate} defaultValue={task.dueDate} />
            <CustomSelect
              options={["Todo", "In Progress", "Done"]}
              onChange={setSelectedStatus}
              defaultValue={task.status}
              variant={"component"}
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
      </motion.form>
    </div>
  ) : null;
}
