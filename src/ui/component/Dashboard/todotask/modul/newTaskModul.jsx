import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";
import { useForm } from "react-hook-form";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import { TaskSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/block/button/Button/Button";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import { motion, AnimatePresence } from "framer-motion";
import useScreenWidth from "@/utils/useScreenWidth";
import { getLabel, toggleTask } from "@/redux/features/TaskSlice/TaskSlice";
import LabelInput from "@/ui/block/input/LabelInput/LabelInput";
import { createTask } from "@/redux/features/TaskSlice/TaskSlice";

export default function NewTaskModul() {
  const router = useRouter();
  const dispatch = useDispatch();
  const taskValue = useAppSelector(
    (state) => state.tasks.newTask
  );

  const onClose = () => {
    dispatch(toggleTask());
  };

  const [labelShow, setLabelShow] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(TaskSchema),
  });

  useEffect(() => {
    setValue("taskLabel", labelValue);
  }, [labelValue, setValue]);

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
    e.preventDefault();

    const taskData = {
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate.toISOString(),
      priority: selectedPriority,
      status: selectedStatus,
      isCompleted: false,
    };

    try {
      await dispatch(createTask(taskData)).unwrap();
      dispatch(
        addToast({
          id: uuidv4(),
          message: `Task "${taskData.title}" created successfully`,
        })
      );
      onClose();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    dispatch(getLabel());
  }, [dispatch]);

  const { labels } = useAppSelector((state) => state.tasks);

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


  return taskValue ? (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0,  }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        ></motion.div>
        <motion.form
          className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col md:justify-normal justify-between"
          onSubmit={handleSubmit(onTaskCreated)}
          {...formMotionProps}
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
                options={[
                  "Must Have",
                  "Should Have",
                  "Could Have",
                  "Won't Have",
                ]}
                onChange={handleSelectChange}
                variant={"component"}
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
                variant={"component"}

              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-input-border dark:border-dark-input-border px-16 py-16 xs:gap-32 gap-16 min-w-full">
            <LabelInput
              register={register}
              errors={errors}
              setValue={setValue}
              labels={labels}
              labelValue={labelValue}
              setLabelValue={setLabelValue}
              labelShow={labelShow}
              setLabelShow={setLabelShow}
            />
            <div className="flex flex-row items-center justify-between md:justify-normal gap-16 w-full md:w-fit">
              <Button text="Cancel" width="fit" onClick={onClose} />
              <Button text="New Task" color="green" width="fit" />
            </div>
          </div>
        </motion.form>
      </div>
    </AnimatePresence>
  ) : (
    <div></div>
  );
}
