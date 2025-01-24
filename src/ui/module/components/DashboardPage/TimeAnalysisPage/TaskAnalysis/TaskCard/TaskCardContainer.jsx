import React from "react";
import TaskCard from "./TaskCard";

export default function TaskCardContainer() {
  const tasks = [
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "success",
      value: 22,
    },
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "success",
      value: 22,
    },
    {
      title: "Completed Tasks",
      percentage: 15,
      status: "success",
      value: 22,
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
        />
      ))}
    </div>
  );
}
