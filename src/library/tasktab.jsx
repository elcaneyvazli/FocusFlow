import React from "react";
import KanbanCard from "@/ui/component/Dashboard/todotask/kanbancard/KanbanCard";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";

export const Tasktab = [
  { id: 1, title: "Kanban", content: <KanbanCard classname="w-full" /> },
  { id: 2, title: "Table", content: <TableCard classname="w-full" /> },
  { id: 3, title: "Schedule", content: "Schedule" },
];
