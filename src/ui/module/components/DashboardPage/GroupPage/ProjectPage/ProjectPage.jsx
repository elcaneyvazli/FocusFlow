"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useProjectById } from "@/services/project.services";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";

export default function ProjectPage() {
  const params = useParams();
  
  // Extract IDs from params and ensure they're strings
  const groupId = params?.id?.toString();
  const projectId = params?.slug?.[0]?.toString();

  // Debug logging
  console.log('ProjectPage - Raw Params:', params);
  console.log('ProjectPage - Extracted IDs:', { groupId, projectId });

  const { project, isLoading, isError, mutate } = useProjectById(groupId, projectId);

  // Early return if IDs are missing
  if (!groupId || !projectId) {
    console.error('ProjectPage - Missing IDs:', { groupId, projectId });
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Missing required IDs. Please check the URL.</p>
      </div>
    );
  }

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
    <div className="flex flex-col gap-12 p-12 pb-32 md:pb-0 overflow-auto">
      <TaskCard
        project={project.taskInformation}
        isLoading={isLoading}
        isError={isError}
      />
      <TaskContainer
        project={project}
        groupId={groupId}
        projectId={projectId}
        mutate={mutate}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
