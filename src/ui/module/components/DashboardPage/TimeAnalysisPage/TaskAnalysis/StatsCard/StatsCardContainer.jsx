import React from "react";
import TaskCard from "./StatsCard";
import { ClipboardList, Icon } from "lucide-react";

export default function StatsCardContainer() {
  const tasks = [
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "success",
      value: 22,
      icon: <ClipboardList className="text-text" size={24} />,
    },
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "error",
      value: 22,
      icon: <ClipboardList className="text-text" size={24} />,
    },
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "success",
      value: 22,
      icon: <ClipboardList className="text-text" size={24} />,
    },
  ];

  return (
    <div className="bg-elevation border border-border rounded-md w-full flex flex-row gap-8">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          title={task.title}
          percentage={task.percentage}
          type={task.status}
          value={task.value}
          icon={task.icon}
        />
      ))}
    </div>
  );
}
