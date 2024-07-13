import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import {
  ChevronDownIcon,
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
import TextInputWithoutBg from "@/ui/block/input/TextInput/TextInputWithoutBg";
import { useRouter } from "next/navigation";

export default function EditTaskModul({ task, edit, setEdit }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const taskValue = useAppSelector((state) => state.editTask.editTask);

  const onEditTask = () => {
    dispatch(toggleEditTask());
    setEdit(null);
  };

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

  const onTaskEdited = async (data) => {
    console.log("Data:", data);
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
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(task.dueDate || null);
  const [selectedPriority, setSelectedPriority] = useState(task.priority || 0);
  const [selectedStatus, setSelectedStatus] = useState(task.status || 0);

  useEffect(() => {
    setSelectedPriority(task.priority);
  }, [task.priority]);

  useEffect(() => {
    setSelectedDate(task.dueDate);
  }, [task.dueDate]);

  useEffect(() => {
    setSelectedStatus(task.status);
  }, [task.status]);

  return edit ? (
    // <div className="fixed inset-0 z-50 flex items-center justify-end">
    //   <div
    //     className="fixed inset-0 bg-black bg-opacity-50"
    //     onClick={onEditTask}
    //   ></div>
    //   <div className="relative w-full sm:w-[70%] lg:w-[50%] h-full bg-white dark:bg-primary p-16 rounded-main flex flex-col justify-between gap-16 z-50">
    //     <div className="flex flex-row justify-between items-center">
    //       <h1 className="text-lg font-medium text-primary dark:text-input-bg">
    //         Edit Task
    //       </h1>
    //       <ButtonWithIcon
    //         icon={
    //           <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
    //         }
    //         onClick={onEditTask}
    //       />
    //     </div>
    //     <form
    //       className="flex flex-col justify-between gap-12 h-full"
    //       onSubmit={handleSubmit(onTaskEdited)}
    //     >
    //       <div className="flex flex-col gap-12 items justify-center h-full">
    //         <TextInput
    //           title="Task Title"
    //           placeholder="Task Title"
    //           register={register}
    //           registername={"taskTitle"}
    //           error={errors.taskTitle?.message}
    //           icon={
    //             <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
    //           }
    //         />
    //         <TextInput
    //           title="Task Description"
    //           placeholder="Task Description"
    //           register={register}
    //           registername={"taskDescription"}
    //           error={errors.taskDescription?.message}
    //           icon={
    //             <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
    //           }
    //         />
    //         <TextInput
    //           title="Task Label"
    //           placeholder="Task Label"
    //           register={register}
    //           registername={"taskLabel"}
    //           error={errors.taskLabel?.message}
    //           icon={<TagIcon className="w-[18px] h-[18px] text-light" />}
    //         />
    //         <DateInput onSelect={setSelectedDate} defaultValue={task.dueDate} />
    //         <CustomSelect
    //           options={["Must Have", "Should Have", "Could Have", "Won't Have"]}
    //           onChange={setSelectedPriority}
    //           defaultValue={task.taskPriority}
    //         />
    //       </div>

    //       <Button text={"Edit Task"} type={"submit"} />
    //     </form>
    //   </div>
    // </div>
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40"
        onClick={onEditTask}
      ></div>
      <form
        className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col md:justify-normal justify-between"
        onSubmit={handleSubmit(onTaskEdited)}
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
        <div
          className="flex flex-col xs:flex-row items-center justify-between border-t border-input-border dark:border-dark-input-border px-16 py-16 xs:gap-32 gap-16 w-full"
          onClick={() => console.log("Clicked")}
        >
          <TextInput
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
            <Button text="Cancel" width="fit" onClick={onEditTask} />
            <Button text="Edit Task" color={"blue"} width="fit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
