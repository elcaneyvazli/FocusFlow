"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { DocumentPlusIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toggleTask } from "@/redux/features/NewTaskSlice/newTaskSlice";
import AddTaskButton from "@/ui/block/button/AddTaskButton/AddTaskButton";
import TextInput from "@/ui/block/input/TextInput/TextInput";

export default function NewTaskModul() {
  const dispatch = useDispatch();

  const taskValue = useAppSelector(
    (state) => state.newTaskReducer.value.newTask
  );

  const onClose = () => {
    dispatch(toggleTask());
  };

  return taskValue ? (
    <div className="fixed top-0 left-0 min-w-full h-screen bg-primary bg-opacity-25 flex items-center justify-center">
      <div className="w-[100%] h-[100%] md:w-[75%] md:h-[75%] xl:w-[50%] xl:h-[50%] bg-white px-16 py-16 rounded-main flex flex-col gap-16 justify-between">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-lg font-medium text-primary">New Task</h1>
          <ButtonWithIcon
            icon={<XMarkIcon className="h-24 w-24 text-primary" />}
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-12 ">
          <TextInput
            title="Task title"
            placeholder="Add Task Title"
            icon={<DocumentPlusIcon className="w-[18px] h-[18px] text-light" />}
          />
          <TextInput
            title="Task description"
            placeholder="Add Task Description"
            icon={<DocumentTextIcon className="w-[18px] h-[18px] text-light" />}
          />
        </div>
        <AddTaskButton />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
