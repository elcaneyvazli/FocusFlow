import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentCheckIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const SideBarItem = [
  {
    title: "To-do Task",
    icon: (
      <DocumentCheckIcon className="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px]" />
    ),
    link: "/dashboard",
  },
  {
    title: "Pomodoro",
    icon: <ClockIcon className="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px]" />,
    link: "/dashboard/pomodoro",
  },
  {
    title: "Time Analysis",
    icon: (
      <PresentationChartLineIcon className="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px]" />
    ),
    link: "/dashboard/timeanalysis",
  },
  {
    title: "Group",
    icon: (
      <UserGroupIcon className="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px]" />
    ),
    link: "/dashboard/group",
  },
];
