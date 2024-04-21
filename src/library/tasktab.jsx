import React from "react";
import Listcard from "@/ui/component/Dashboard/todotask/listcard/listcard";

export const Tasktab = [
  {
    id: 1,
    title: "List",
    content: <Listcard  classname='w-full'/>,
  },
  {
    id: 2,
    title: "Table",
    content: 'Table',
  },
  {
    id: 3,
    title: "Schedule",
    content: "Schedule",
  },
];
