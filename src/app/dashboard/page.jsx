"use client";
import Tab from "@/ui/block/Tab/Tab";
import NewTaskModul from "@/ui/component/Dashboard/todotask/modul/newTaskModul";
import Taskcard from "@/ui/component/Dashboard/todotask/taskcard/taskcard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        <Taskcard />
      </div>
      <Tab />
      <NewTaskModul />
    </div>
  );
}
