import { getTasks } from "@/services/task/task.services";
import TableCardHeader from "./TableCardHeader";
import TableCardItem from "./TableCardItem";
import { useEffect, useState } from "react";

export default function TableCard({ data, loading, error }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div
      className="flex flex-col gap-0 border border-input-border dark:border-dark-input-border rounded-main w-full overflow-y-scroll
      bg-white dark:bg-dark-input-bg
    "
    >
      <TableCardHeader />
      <TableCardItem className="w-full" data={data} />
    </div>
  );
}
