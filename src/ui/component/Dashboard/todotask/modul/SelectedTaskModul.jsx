import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTaskModul } from "@/redux/features/TaskSlice/TaskSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SelectedTaskModul() {
  const dispatch = useDispatch();

  const selectedTaskValue = useAppSelector(
    (state) => state.selectedTaskReducer.value.modul
  );
  const selectedTask = useAppSelector(
    (state) => state.selectedTaskReducer.value.selectedTask
  );

  const toggleSelect = () => {
    dispatch(toggleTaskModul());
  };

  console.log(selectedTask, selectedTaskValue);

  return selectedTaskValue ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleSelect}
      ></div>
      <div className="relative w-[90%] sm:w-[80%] lg:w-[50%] h-auto  bg-white dark:bg-primary px-16 py-16 rounded-main flex flex-col gap-16 justify-between z-50">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-lg font-medium text-primary dark:text-input-bg">
            Task Detail
          </h1>
          <ButtonWithIcon
            icon={
              <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            }
            onClick={toggleSelect}
          />
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-0">
            <h1 className="text-2xl font-medium text-primary dark:text-input-bg">
              {selectedTask.title}
            </h1>
            <div className="flex flex-row gap-12">
              <h1 className="text-md text-primary dark:text-input-bg">
                Priority:
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
