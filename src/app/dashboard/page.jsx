"use client";

import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/NewTaskModul";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
import { getTasks } from "@/services/task/task.services";
import dynamic from "next/dynamic";
import KanbanBoardSkeleton from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoardSkeleton";
import TaskCardSkeleton from "@/ui/component/Dashboard/todotask/taskcard/TaskCardSkeleton";
import TimeTrackerContainer from "@/ui/component/Dashboard/todotask/TimeTracker/TimeTrackerContainer";
import SelectedTaskModul from "@/ui/component/Dashboard/todotask/modul/SelectedTaskModul";
import NewTaskButton from "@/ui/block/button/NewTaskButton/NewTaskButton";
import Toast from "@/ui/block/Toast/Toast";
import { useRouter } from "next/navigation";
import useScreenWidth from "@/utils/useScreenWidth";
import AiButton from "@/ui/block/button/AiButton/AiButton";
import AiModul from "@/ui/component/Dashboard/todotask/modul/AiModul";

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
  const [columns, setColumns] = useState([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setTotal(response.total);
        setPending(response.pending);
        setCompleted(response.completed);
        setColumns(response.tasks);
        setLoading(false);
        router.refresh();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const dispatch = useDispatch();

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

  const isScreenSmall = useScreenWidth(1024);

  const tabs = [
    {
      id: 1,
      title: "Board",
      content: (
        <MobileKanbanBoard
          classname="w-full"
          columns={columns}
          loading={loading}
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
        loading={loading}
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
