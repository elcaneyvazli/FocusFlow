import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Empty from "@/ui/assert/empty.svg";
import OnlyViewCalendar from "@/ui/block/input/Dueto/OnlyviewCalendar";
import {
  ClockIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

const fakedata = [
  // September 1st - 2 tasks
  {
    date: "09.01.2024",
    title: "Design Homepage Layout",
    description: "Create a modern and responsive design for the homepage.",
    label: "Design",
    dueDate: "2024-09-01",
    status: 0,
  },
  {
    date: "09.01.2024",
    title: "Review SEO Strategy",
    description: "Analyze and improve SEO for the website.",
    label: "Marketing",
    dueDate: "2024-09-01",
    status: 1,
  },
  // September 3rd - 4 tasks
  {
    date: "09.03.2024",
    title: "Fix Bugs",
    description: "Resolve reported issues in the app.",
    label: "Development",
    dueDate: "2024-09-03",
    status: 1,
  },
  {
    date: "09.03.2024",
    title: "Team Meeting",
    description: "Weekly sync with the development team.",
    label: "Meetings",
    dueDate: "2024-09-03",
    status: 0,
  },
  {
    date: "09.03.2024",
    title: "Client Feedback",
    description: "Incorporate client feedback into the project plan.",
    label: "Client",
    dueDate: "2024-09-03",
    status: 1,
  },
  {
    date: "09.03.2024",
    title: "Update Documentation",
    description: "Ensure that project documentation is up to date.",
    label: "Documentation",
    dueDate: "2024-09-03",
    status: 2,
  },
  // September 5th - no tasks
  // September 6th - 4 tasks
  {
    date: "09.06.2024",
    title: "Social Media Post",
    description: "Prepare and schedule social media post for product launch.",
    label: "Marketing",
    dueDate: "2024-09-06",
    status: 0,
  },
  {
    date: "09.06.2024",
    title: "Backend API Refactor",
    description: "Refactor the existing backend API for better performance.",
    label: "Development",
    dueDate: "2024-09-06",
    status: 1,
  },
  {
    date: "09.06.2024",
    title: "Prepare Sales Deck",
    description: "Create a sales deck for the upcoming product demo.",
    label: "Sales",
    dueDate: "2024-09-06",
    status: 0,
  },
  {
    date: "09.06.2024",
    title: "Conduct User Testing",
    description: "Run user tests for the new feature rollout.",
    label: "QA",
    dueDate: "2024-09-06",
    status: 2,
  },
  // September 7th - 1 task
  {
    date: "09.07.2024",
    title: "Review Security Protocols",
    description: "Go over the security protocols for the application.",
    label: "Security",
    dueDate: "2024-09-07",
    status: 1,
  },
  // September 9th - 5 tasks
  {
    date: "09.09.2024",
    title: "Deploy New Feature",
    description: "Deploy the new feature to production.",
    label: "Deployment",
    dueDate: "2024-09-09",
    status: 1,
  },
  {
    date: "09.09.2024",
    title: "Design Mobile UI",
    description: "Design UI for mobile responsiveness.",
    label: "Design",
    dueDate: "2024-09-09",
    status: 0,
  },
  {
    date: "09.09.2024",
    title: "Prepare Blog Post",
    description: "Write a blog post to announce the new feature.",
    label: "Content",
    dueDate: "2024-09-09",
    status: 2,
  },
  {
    date: "09.09.2024",
    title: "Server Maintenance",
    description: "Perform scheduled maintenance on the server.",
    label: "Ops",
    dueDate: "2024-09-09",
    status: 0,
  },
  {
    date: "09.09.2024",
    title: "Analyze Competitor Data",
    description: "Review and analyze data from competitors.",
    label: "Analytics",
    dueDate: "2024-09-09",
    status: 1,
  },
];

export default function TaskCalendar() {
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const tasks = fakedata.filter(
      (item) => item.date === selectedDate.format("MM.DD.YYYY")
    );
    setSelectedTasks(tasks || []);
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    const selectedDayjsDate = dayjs(date);
    setSelectedDate(selectedDayjsDate);
  };

  return (
    <div className="h-full w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border rounded-main flex flex-col gap-16 p-8 overflow-hidden">
      <div className="w-full h-fit">
        <OnlyViewCalendar
          today={today}
          setToday={setToday}
          selectedDate={selectedDate}
          setSelectedDate={handleDateSelect}
        />
      </div>

      <div className="flex flex-col gap-8 h-full w-full overflow-y-auto">
        {selectedTasks.length > 0 ? (
          selectedTasks.map((task, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-16 cursor-pointer relative"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-8 bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border p-16 rounded-main z-10 relative">
                <div className="flex flex-row justify-between items-center">
                  <motion.div
                    className={`flex items-center justify-center border border-input-border dark:border-0 h-[20px] w-[20px] rounded-main cursor-pointer ${
                      task.status === 2 ? "bg-primary" : "bg-white"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.status === 2 && (
                      <CheckIcon className="h-[12px] w-[12px] text-white" />
                    )}
                  </motion.div>
                  <div
                    className="rounded-main hover:bg-input-bg p-8 dark:hover:bg-primary"
                    onClick={() => {}}
                  >
                    <EllipsisHorizontalIcon className="h-[18px] w-[18px] text-primary dark:text-input-bg" />
                  </div>
                </div>
                <div
                  className="flex flex-col gap-0 cursor-pointer w-full h-full"
                  onClick={() => {}}
                >
                  <h1 className="text-md font-bold text-primary dark:text-input-bg max-w-full line-clamp-3">
                    {task.title}
                  </h1>
                  <p className="text-xs text-light line-clamp-1">
                    {task.description}
                  </p>
                </div>
                <div className="flex flex-row gap-8 items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <ClockIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                    <p className="text-sm text-primary dark:text-input-bg">
                      Activity
                    </p>
                  </div>
                  <p className="text-sm text-primary dark:text-input-bg">-</p>
                  <div
                    className={`px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap bg-${
                      task.status === 0
                        ? "gray"
                        : task.status === 1
                        ? "blue"
                        : "green"
                    }-bg`}
                  >
                    <p
                      className={`text-xs text-${
                        task.status === 0
                          ? "gray"
                          : task.status === 1
                          ? "blue"
                          : "green"
                      }-text`}
                    >
                      {task.status === 0
                        ? "To do"
                        : task.status === 1
                        ? "In Progress"
                        : "Done"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <CalendarDaysIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                    <p className="text-sm text-primary dark:text-input-bg">
                      Date
                    </p>
                  </div>
                  <p className="text-sm text-primary dark:text-input-bg">-</p>
                  <p className="text-sm text-light">
                    {new Date(task.dueDate).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="flex flex-row gap-2 items-center">
                    <BookmarkIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                    <p className="text-sm text-primary dark:text-input-bg">
                      Label
                    </p>
                  </div>
                  <div className="px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border dark:bg-primary bg-input-bg rounded-main whitespace-nowrap">
                    <p className="text-xs text-primary dark:text-input-bg">
                      {task.label.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="w-full h-full">
            <Image src={Empty} alt="No tasks" />
          </div>
        )}
      </div>
    </div>
  );
}
