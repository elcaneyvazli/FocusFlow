import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/block/button/Button/Button";
import { updateTask } from "@/services/task/task.services";
import { toggleEditTask } from "@/redux/features/EditTaskSlice/EditTaskSlice";
import { TaskSchema } from "@/schema/schema";
import DateInput from "@/ui/block/input/Dueto/DateInput";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";

export default function EditTaskModul({ task, edit, setEdit }) {
  const dispatch = useDispatch();
  const taskValue = useAppSelector((state) => state.editTask.editTask);

  const onEditTask = () => {
    dispatch(toggleEditTask());
    setEdit(null);
  };

  console.log("Task Edit Value:", task.taskPriority);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: {
      taskTitle: task?.title || "",
      taskDescription: task?.description || "",
      taskLabel: task?.label || "",
    },
  });

  const onTaskEdited = async (data, e) => {
    e.preventDefault();

    const updatedTaskData = {
      ...task,
      title: data.taskTitle,
      description: data.taskDescription,
      label: data.taskLabel,
      dueDate: selectedDate,
      taskPriority: selectedPriority,
    };

    try {
      await updateTask(task.id, updatedTaskData);
      onEditTask();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(task.dueDate || null);
  const [selectedPriority, setSelectedPriority] = useState(
    task.taskPriority || 0
  );

  useEffect(() => {
    setSelectedPriority(task.taskPriority);
  }, [task.taskPriority]);

  console.log("Selected Date:", selectedDate);
  console.log("Selected Priority:", selectedPriority);

  return taskValue ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full md:h-screen flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onEditTask}
        ></div>
        <div className="relative w-full h-full md:w-[70%] md:h-auto bg-white dark:bg-primary px-16 py-16 rounded-main flex flex-col gap-16 justify-between z-50">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg font-medium text-primary dark:text-input-bg">
              Edit Task
            </h1>
            <ButtonWithIcon
              icon={
                <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
              }
              onClick={onEditTask}
            />
          </div>
          <form
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(onTaskEdited)}
          >
            <TextInput
              title="Task Title"
              placeholder="Task Title"
              register={register}
              registername={"taskTitle"}
              error={errors.taskTitle?.message}
              icon={
                <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInput
              title="Task Description"
              placeholder="Task Description"
              register={register}
              registername={"taskDescription"}
              error={errors.taskDescription?.message}
              icon={
                <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInput
              title="Task Label"
              placeholder="Task Label"
              register={register}
              registername={"taskLabel"}
              error={errors.taskLabel?.message}
              icon={<TagIcon className="w-[18px] h-[18px] text-light" />}
            />
            <DateInput onSelect={setSelectedDate} defaultValue={task.dueDate} />
            <CustomSelect
              onChange={setSelectedPriority}
              defaultValue={task.taskPriority}
            />
            <Button
              text={"Edit Task"}
              onClick={handleSubmit(onTaskEdited)}
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </>
  ) : null;
}
