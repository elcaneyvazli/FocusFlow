"use client";
import Button from "@/ui/module/blocks/Button/Button";
import { LayoutGrid as GridIcon, List as ListIcon } from "lucide-react";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import AnalysisCardContainer from "./AnalysisCard/AnalysisCardContainer";
import dynamic from "next/dynamic";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
const BoardContainer = dynamic(() => import("./Board/BoardContainer"), {
  loading: () => <Spinner />,
});
const Tab = dynamic(() => import("@/ui/module/blocks/Tab/Tab"), {
  loading: () => (
    <div className="relative flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-4 border-0 sm:border-b border-border">
      <div className="flex flex-row items-center justify-center gap-8 px-16 py-12 w-full sm:w-fit relative border-0 text-light">
        <div className="h-[36px] w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-[36px] w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="flex flex-row gap-16 items-end justify-end w-full">
        <div className="h-[36px] w-full sm:w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  ),
});

export default function TodotaskPage() {
  const mobilescreen = useScreenWidth(640);

  const tabs = [
    {
      id: "board",
      title: "Board View",
      icons: <GridIcon size={18} />,
      content: <BoardContainer />,
    },
    {
      id: "list",
      title: "List View",
      icons: <ListIcon size={18} />,
      content: <div>List</div>,
    },
  ];

  return (
    <div className="flex flex-col gap-24 w-full h-full p-12">
      <AnalysisCardContainer />
      <Tab
        tabs={tabs}
        component={
          <Button text="New Task" width={mobilescreen ? "full" : "fit"} />
        }
      />
    </div>
  );
}
