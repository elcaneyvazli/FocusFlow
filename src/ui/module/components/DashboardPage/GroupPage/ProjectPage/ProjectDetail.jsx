import {
  setToggleAddMember,
  setToggleEditProject,
} from "@/redux/features/ProjectSlice/ProjectSlice";
import Button from "@/ui/module/blocks/Button/Button";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import React from "react";
import { useDispatch } from "react-redux";

export default function ProjectDetail({ project }) {
  const dispatch = useDispatch();
  const mobile = useScreenWidth(768);

  return (
    <div className="flex flex-row items-center gap-12 bg-elevation border border-border rounded-md p-12">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-md text-text font-semibold leading-none">
          {project.name}
        </h1>
        <p className="text-xs text-text leading-none">{project.description}</p>
      </div>
      <div className="flex flex-row gap-8 items-center w-full md:w-fit">
        <Button
          variant="primary"
          size="medium"
          text={"Add Member"}
          onClick={() => dispatch(setToggleAddMember())}
          width={mobile ? "full" : "fit"}
        />
        <Button
          variant="primary"
          size="medium"
          text={"Edit Project"}
          width={mobile ? "full" : "fit"}
          onClick={() => dispatch(setToggleEditProject())}
        />
      </div>
    </div>
  );
}
