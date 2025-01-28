import GroupDetailContainer from "./GroupDetail/GroupDetailContainer";
import dynamic from "next/dynamic";
import GroupForm from "./GroupForm";

const ProjectCardContainer = dynamic(
  () => import("./ProjectCard/ProjectCardContainer"),
  {
    loading: () => (
      <div className="grid grid-cols-12 gap-16 col-span-8">
        {[0, 1, 2, 3].map((index) => (
          <div
            className="w-full col-span-6 bg-elevation border border-border flex flex-col gap-0 rounded-md cursor-pointer animate-pulse h-fit"
            key={index}
          >
            <div className="flex flex-col gap-4 p-12">
              <div className="w-64 h-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
              <div className="w-96 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
            </div>
            <div className="border-t border-border flex flex-row justify-between items-end p-12">
              <div className="relative w-[64px] h-[24px]">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="absolute top-0"
                    style={{ left: `${index * 16}px`, zIndex: 3 - index }}
                  >
                    <div className="w-24 h-24 bg-background animate-pulse rounded-full border border-border"></div>
                  </div>
                ))}
              </div>
              <p className="w-96 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></p>
            </div>
          </div>
        ))}
      </div>
    ),
  }
);

export default function GroupPage() {

  return (
    <div className="grid grid-cols-12 gap-16 p-12 h-full w-full">
      <div className="h-full w-full col-span-8 flex flex-col gap-16 overflow-y-auto">
        <GroupForm />
        <ProjectCardContainer />
      </div>
      <div className="h-full w-full col-span-4">
        <GroupDetailContainer />
      </div>
    </div>
  );
}
