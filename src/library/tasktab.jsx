import React from "react";
import Listcard from "@/ui/component/Dashboard/todotask/listcard/listcard";
import TableCard from "@/ui/component/Dashboard/todotask/tablecard/TableCard";

export const Tasktab = [
  {
    id: 1,
    title: "Table",
    content: <TableCard classname="w-full" />,
  },
  {
    id: 2,
    title: "List",
    content: <Listcard classname="w-full" />,
  },
  {
    id: 3,
    title: "Schedule",
    content: "Schedule",
  },
];
