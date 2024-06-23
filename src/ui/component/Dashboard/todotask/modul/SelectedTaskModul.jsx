import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import {
  toggleTaskFullScreen,
  toggleTaskModul,
} from "@/redux/features/TaskSlice/TaskSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import {
  ArrowsPointingOutIcon,
  BookmarkIcon,
  ClockIcon,
  TagIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Tab from "@/ui/block/Tab/Tab";

export default function SelectedTaskModul() {
  const dispatch = useDispatch();

  const selectedTaskValue = useAppSelector(
    (state) => state.selectedTaskReducer.value.modul
  );
  const fullScreen = useAppSelector(
    (state) => state.selectedTaskReducer.value.fullscreen
  );
  const selectedTask = useAppSelector(
    (state) => state.selectedTaskReducer.value.selectedTask
  );

  const toggleSelect = () => {
    dispatch(toggleTaskModul());
  };
  const toggleFullScreen = () => {
    dispatch(toggleTaskFullScreen());
  };

  console.log(selectedTask, selectedTaskValue);

  const tabs = [
    {
      id: 1,
      title: "Description",
      content: <SelectedTaskDesc selectedTask={selectedTask} />,
    },
    {
      id: 2,
      title: "Subtask",
      content: <div>test</div>,
    },
  ];

  return selectedTaskValue ? (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex items-center justify-end z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleSelect}
      ></div>
      <div
        className={`relative ${
          fullScreen ? "w-[100%]" : " w-[100%] sm:w-[80%] lg:w-[50%]"
        } h-screen bg-white dark:bg-primary px-32 py-32 rounded-main flex flex-col gap-16 justify-between z-50`}
      >
        <div className="flex flex-row justify-between items-center">
          <ButtonWithIcon
            icon={
              <ArrowsPointingOutIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            }
            onClick={toggleFullScreen}
          />
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
        <div className="flex flex-col gap-12 h-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-0 pb-16 border-b border-input-border dark:border-dark-input-border">
              <h1 className="text-2xl font-medium text-primary dark:text-input-bg">
                {selectedTask.title}
              </h1>
            </div>
            <div className="flex flex-row items-center gap-32 border-b border-input-border dark:border-dark-input-border pb-12">
              <div className="flex flex-row items-center gap-8">
                <UsersIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                <h1 className="text-xl font-bold text-primary dark:text-input-bg">
                  Assignes:
                </h1>
              </div>

              <h1 className="text-lg text-primary dark:text-input-bg">
                John Doe
              </h1>
            </div>
            <div className="flex flex-row items-center gap-32 border-b border-input-border dark:border-dark-input-border pb-12">
              <div className="flex flex-row items-center gap-8">
                <TagIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                <h1 className="text-xl font-bold text-primary dark:text-input-bg">
                  Priorty:
                </h1>
              </div>

              <div
                className={`px-12 py-4 flex flex-row justify-between items-center w-fit rounded-main bg-${
                  selectedTask.taskPriority == 0
                    ? "red"
                    : 1
                    ? "blue"
                    : 2
                    ? "green"
                    : "gray"
                }-bg`}
              >
                <p
                  className={`text-sm text-${
                    selectedTask.taskPriority == 0
                      ? "red"
                      : 1
                      ? "blue"
                      : 2
                      ? "green"
                      : "gray"
                  }-text`}
                >
                  {selectedTask.taskPriority == 0
                    ? "Must Have"
                    : 1
                    ? "Should Have"
                    : 2
                    ? "Could Have"
                    : "Won't Have"}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-32 border-b border-input-border dark:border-dark-input-border pb-12">
              <div className="flex flex-row items-center gap-8">
                <ClockIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                <h1 className="text-xl font-bold text-primary dark:text-input-bg">
                  Due Date:
                </h1>
              </div>
              <h1 className="text-lg text-primary dark:text-input-bg">
                {new Date(selectedTask.dueDate).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
            </div>
            <div className="flex flex-row items-center gap-32 border-b border-input-border dark:border-dark-input-border pb-12">
              <div className="flex flex-row items-center gap-8">
                <BookmarkIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                <h1 className="text-xl font-bold text-primary dark:text-input-bg">
                  Label:
                </h1>
              </div>
              <h1 className="text-md text-primary dark:text-input-bg">
                {selectedTask.label}
              </h1>
            </div>
          </div>
          <Tab tabs={tabs} />
        </div>
      </div>
    </div>
  ) : null;
}

function SelectedTaskDesc({ selectedTask }) {
  return (
    <div className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-12 rounded-main">
      {selectedTask.description}
    </div>
  );
}
