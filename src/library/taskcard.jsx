import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const taskcard = [
  {
    id: 1,
    title: "Total Task",
    icon: (
      <ClipboardDocumentListIcon className="h-24 w-24 text-primary dark:text-input-bg" />
    ),
    task: 56,
    trend: true,
    percentage: 1.6,
  },
  {
    id: 2,
    title: "Completed Task",
    icon: (
      <ClipboardDocumentCheckIcon className="h-24 w-24 text-primary dark:text-input-bg" />
    ),
    task: 34,
    trend: false,
    percentage: 2.7,
  },
  {
    id: 3,
    title: "Pending Task",
    icon: (
      <DocumentMagnifyingGlassIcon className="h-24 w-24 text-primary dark:text-input-bg" />
    ),
    task: 24,
    trend: true,
    percentage: 10.6,
  },
];
