"use client";
import Button from "@/ui/module/blocks/Button/Button";
import Tab from "@/ui/module/blocks/Tab/Tab";
import { LayoutGrid as GridIcon, List as ListIcon } from "lucide-react";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import AnalysisCardContainer from "./AnalysisCard/AnalysisCardContainer";
import dynamic from "next/dynamic";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
const BoardContainer = dynamic(() => import("./Board/BoardContainer"), {
  loading: () => <Spinner />,
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
