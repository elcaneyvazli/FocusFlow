import React from "react";
import GroupProjectCard from "./GroupProjectCard";

export default function GroupProjectContainer({ groupProject }) {
  return (
    <div className="grid grid-cols-12 gap-16 overflow-visible p-4">
      {groupProject.map((project) => (
        <div key={project.id} className="col-span-12 lg:col-span-6 overflow-visible">
          <GroupProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
