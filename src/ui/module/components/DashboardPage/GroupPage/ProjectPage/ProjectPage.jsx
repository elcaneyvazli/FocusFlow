"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useProjectById } from "@/services/project.services";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id;
  const slug = params.slug[0];

  const { project, isLoading, isError, mutate } = useProjectById(id, slug);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">
          Error loading project. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-12 p-12">
      <TaskCard
        project={project.taskInformation}
        isLoading={isLoading}
        isError={isError}
      />
      <TaskContainer
        project={project}
        mutate={mutate}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
