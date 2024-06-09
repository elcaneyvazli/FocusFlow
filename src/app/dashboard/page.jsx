"use client";
import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import Taskcard from "@/ui/component/Dashboard/todotask/taskcard/taskcard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "@/redux/features/DarkModeSlice/DarkModeSlice";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
import KanbanBoard from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoard";

export default function Home() {
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
    { id: 1, title: "Kanban", content: <KanbanBoard classname="w-full" /> },
    { id: 2, title: "Table", content: <TableCard classname="w-full" /> },
  ];

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        <Taskcard />
      </div>
      <Tab tabs={tabs} />
      <NewTaskModul />
    </div>
  );
}
