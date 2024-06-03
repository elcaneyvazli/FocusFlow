import React from "react";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";
import KanbanBoard from "@/ui/component/Dashboard/todotask/kanbancard/KanbanBoard";

export const Tasktab = [
  { id: 1, title: "Kanban", content: <KanbanBoard classname="w-full" /> },
  { id: 2, title: "Table", content: <TableCard classname="w-full" /> },
];


