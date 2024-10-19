"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { id } = useParams();
  return <div className="text-primary dark:text-input-bg">{id}</div>;
}
