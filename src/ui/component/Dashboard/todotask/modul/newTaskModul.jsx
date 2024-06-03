"use client";
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
import AddTaskButton from "@/ui/block/button/AddTaskButton/AddTaskButton";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import CustomSelect from "@/ui/block/input/SelectInput/SelectInput";

export default function NewTaskModul() {
  const dispatch = useDispatch();

  const taskValue = useAppSelector(
    (state) => state.newTaskReducer.value.newTask
  );

  const onClose = () => {
    dispatch(toggleTask());
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  return taskValue ? (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
        <div className="relative w-full h-full md:w-[50%] md:h-auto xl:w-[30%] xl:h-auto bg-white dark:bg-primary px-16 py-16 rounded-main flex flex-col gap-16 justify-between z-50">
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
          <div className="flex flex-col gap-12">
            <TextInput
              title="Task title"
              placeholder="Add Task Title"
              icon={
                <DocumentPlusIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInput
              title="Task description"
              placeholder="Add Task Description"
              icon={
                <DocumentTextIcon className="w-[18px] h-[18px] text-light" />
              }
            />
            <TextInput
              title="Label"
              placeholder="Add Task Label"
              icon={<TagIcon className="w-[18px] h-[18px] text-light" />}
            />
            <CustomSelect
              options={["Must Have", "Should Have", "Could Have", "Won't Have"]}
              onChange={handleSelectChange}
            />
          </div>
          <AddTaskButton />
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}
