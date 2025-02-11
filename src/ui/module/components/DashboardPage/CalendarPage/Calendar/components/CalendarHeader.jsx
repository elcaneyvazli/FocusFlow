import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/ui/module/blocks/Button/Button";

const CalendarHeader = ({ selectedDate, currentView, navigate, goToToday }) => {
  return (
    <div className="flex flex-row items-center gap-8">
      <h2 className="text-xl font-mediumn text-text"></h2>
      <Button
        onClick={() => navigate(-1)}
        icon={<ChevronLeft className="text-white" size={20} />}
        type="icon-primary"
        size="small"
      />
      <Button
        onClick={goToToday}
        type="primary"
        size="small"
        text={selectedDate.format(
          currentView === "month"
            ? "MMMM YYYY"
            : currentView === "week"
            ? "MMM D - " + selectedDate.endOf("week").format("MMM D, YYYY")
            : "dddd, MMMM D, YYYY"
        )}
      />
      <Button
        onClick={() => navigate(1)}
        icon={<ChevronRight className="text-white" size={20} />}
        type="icon-primary"
        size="small"
      />
    </div>
  );
};

export default CalendarHeader;
