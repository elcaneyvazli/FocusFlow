import React from "react";
import TableCardHeader from "./TableCardHeader";
import TableCardItem from "./TableCardItem";

export default function TableCard() {
  return (
    <div className="flex flex-col gap-0 border border-input-border dark:border-dark-input-border rounded-main w-full overflow-y-scroll">
      <div className="w-full">
        <TableCardHeader />
      </div>
      <div className="flex flex-col gap-0 bg-white ">
        <TableCardItem className="w-full" />
        <TableCardItem className="w-full" />
        <TableCardItem className="w-full" />
        <TableCardItem className="w-full" />
        <TableCardItem className="w-full" />
      </div>
    </div>
  );
}
