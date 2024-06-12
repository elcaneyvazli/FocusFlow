"use client";
import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
import { getTasks } from "@/services/task/task.services";
import { useState } from "react";
import dynamic from "next/dynamic";
import KanbanBoardSkeleton from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoardSkeleton";
import TaskCardSkeleton from "@/ui/component/Dashboard/todotask/taskcard/TaskCardSkeleton";
import { useRouter } from "next/navigation";
import EditTaskModul from "@/ui/component/Dashboard/todotask/modul/editTaskModul";

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

export default function Home() {
  const router = useRouter();

  const [columns, setColumns] = useState();
  const [total, setTotal] = useState();
  const [pending, setPending] = useState();
  const [completed, setCompleted] = useState();
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
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const tabs = [
    {
      id: 1,
      title: "Board",
      content: (
        <KanbanBoard
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
      title: "Table",
      content: (
        <TableCard
          classname="w-full"
          data={columns}
          loading={loading}
          error={error}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-16 w-full">
      <Taskcard
        total={total}
        pending={pending}
        completed={completed}
        loading={loading}
        error={error}
      />
      <Tab tabs={tabs} />
      <NewTaskModul />
    </div>
  );
}
