"use client";

import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import { useEffect, useState } from "react";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
// import { getTasks } from "@/services/task/task.services";
import dynamic from "next/dynamic";
import KanbanBoardSkeleton from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoardSkeleton";
import TaskCardSkeleton from "@/ui/component/Dashboard/timeanalysis/TaskCard/TaskCardSkeleton";
import TimeTrackerContainer from "@/ui/component/Dashboard/todotask/TimeTracker/TimeTrackerContainer";
import SelectedTaskModul from "@/ui/component/Dashboard/todotask/modul/SelectedTaskModul";
import NewTaskButton from "@/ui/block/button/NewTaskButton/NewTaskButton";
import Toast from "@/ui/block/Toast/Toast";
import { useRouter } from "next/navigation";
import useScreenWidth from "@/utils/useScreenWidth";
import AiButton from "@/ui/block/button/AiButton/AiButton";
import AiModul from "@/ui/component/Dashboard/todotask/modul/AiModul";
import { getTasks } from "@/redux/features/TaskSlice/TaskSlice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const Taskcard = dynamic(
  () => import("@/ui/component/Dashboard/todotask/taskcard/taskcard"),
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
  const router = useRouter();

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
      router.refresh();
    } else if (status === "failed") {
      setErrorMessage(error);
    }
  }, [status, tasks, error, router]);

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
      content: <TableCard data={columns} />,
    },
  ];

  const tabComponent = [
    <AiButton key="aiButton" />,
    <NewTaskButton key="newTaskButton" />,
  ];

  return (
    <div className="flex flex-col gap-16 w-full relative h-full pb-32">
      <TimeTrackerContainer data={columns} />
      <Taskcard
        total={total}
        pending={pending}
        completed={completed}
        error={error}
      />
      <Tab tabs={tabs} component={tabComponent} />
      <NewTaskModul />
      <SelectedTaskModul />
      <Toast />
      <AiModul />
    </div>
  );
}
