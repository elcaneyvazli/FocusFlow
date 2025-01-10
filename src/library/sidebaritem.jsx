import {
  CalendarSync,
  ChartNoAxesCombined,
  ClipboardList,
  Hourglass,
  Users,
} from "lucide-react";

export const SideBarItem = [
  {
    title: "To-do Task",
    icon: <ClipboardList strokeWidth={1.5} size={16} />,
    link: "/dashboard",
  },
  {
    title: "Pomodoro",
    icon: <Hourglass strokeWidth={1.5} size={16} />,
    link: "/dashboard/pomodoro",
  },
  {
    title: "Time Analysis",
    icon: <ChartNoAxesCombined strokeWidth={1.5} size={16} />,
    link: "/dashboard/timeanalysis",
  },
  {
    title: "Group",
    icon: <Users strokeWidth={1.5} size={16} />,
    link: "/dashboard/group",
  },
  {
    title: "Calendar",
    icon: <CalendarSync strokeWidth={1.5} size={16} />,
    link: "/dashboard/calendar",
  },
];
