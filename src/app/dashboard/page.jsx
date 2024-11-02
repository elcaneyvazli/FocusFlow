"use client";

import Tab from "@/ui/block/Tab/Tab";
import { useEffect, useState } from "react";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
import dynamic from "next/dynamic";
import KanbanBoardSkeleton from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoardSkeleton";
import TaskCardSkeleton from "@/ui/component/Dashboard/timeanalysis/TaskCard/TaskCardSkeleton";
import NewTaskButton from "@/ui/block/button/NewTaskButton/NewTaskButton";
import AiButton from "@/ui/block/button/AiButton/AiButton";
import { getTasks } from "@/redux/features/TaskSlice/TaskSlice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const Taskcard = dynamic(
  () => import("@/ui/component/Dashboard/timeanalysis/TaskCard/taskcard"),
  {
    loading: () => <TaskCardSkeleton />,
    ssr: false,
  }
);

const KanbanBoard = dynamic(
  () => import("@/ui/component/Dashboard/todotask/kanbancard/KanbanBoard"),
  {
    loading: () => <KanbanBoardSkeleton />,
    ssr: false,
  }
);

const MobileKanbanBoard = dynamic(
  () =>
    import(
      "@/ui/component/Dashboard/todotask/MobileKanbarBoard/MobileKanbanBoard"
    ),
  {
    loading: () => <KanbanBoardSkeleton />,
    ssr: false,
  }
);

export default function Home() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (status === "succeeded") {
      setTotal(tasks.total);
      setPending(tasks.pending);
      setCompleted(tasks.completed);
      setColumns(tasks.tasks);
    } else if (status === "failed") {
      setErrorMessage(error);
    }
  }, [status, tasks, error]);

  useEffect(() => {
    const handleStorageChange = () => {
      const darkValue = localStorage.getItem("theme");
      dispatch(setDarkMode(darkValue === "dark"));
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  const tabs = [
    {
      id: 1,
      title: "Board",
      icons: <Squares2X2Icon className="w-[20px] h-[20px]" />,
      content: (
        <MobileKanbanBoard
          classname="w-full"
          columns={columns}
          error={error}
          setColumns={setColumns}
        />
      ),
    },
    {
      id: 2,
      title: "List",
      icons: <ListBulletIcon className="w-[20px] h-[20px]" />,
      content: <TableCard data={columns} />,
    },
  ];

  const tabComponent = [
    // <AiButton key="aiButton" />,
    <NewTaskButton key="newTaskButton" />,
  ];

  return (
    <div className="flex flex-col gap-16 w-full relative h-full">
      <Taskcard />

      <Tab tabs={tabs} component={tabComponent} />
    </div>
  );
}
