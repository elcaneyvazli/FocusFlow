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
    icon: <DocumentCheckIcon className="w-[18px] h-[18px]" />,
    link: "/dashboard",
  },
  {
    title: "Time Analysis",
    icon: <PresentationChartLineIcon className="w-[18px] h-[18px]" />,
    link: "/dashboard/timeanalysis",
  },
  {
    title: "Calendar",
    icon: <CalendarDaysIcon className="w-[18px] h-[18px]" />,
    link: "/dashboard/calendar",
  },
  {
    title: "Group",
    icon: <UserGroupIcon className="w-[18px] h-[18px]" />,
    link: "/dashboard/group",
  },
];
