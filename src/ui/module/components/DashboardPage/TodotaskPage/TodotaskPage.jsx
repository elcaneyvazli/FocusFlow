import { LayoutGrid, List, X } from "lucide-react";
import Button from "../../../blocks/Button/Button";
import Tab from "../../../blocks/Tab/Tab";
import AnalysisCardContainer from "./AnalysisCard/AnalysisCardContainer";
import BoardContainer from "./Board/BoardContainer";

export default function TodotaskPage() {
  const tabs = [
    {
      id: 1,
      title: "Board",
      icons: <LayoutGrid className="w-[20px] h-[20px]" />,
      content: <BoardContainer />,
    },
    {
      id: 2,
      title: "List",
      icons: <List className="w-[20px] h-[20px]" />,
      content: <div>list</div>,
    },
  ];
  const tabComponent = [<Button text="New Task" />];
  return (
    <div className="px-16 py-16 text-text flex flex-col gap-24">
      <AnalysisCardContainer />
      <Tab tabs={tabs} component={tabComponent} />
    </div>
  );
}
