'use client';
import { getTasks } from "@/services/task/task.services";
import { CustomKanban } from "@/ui/component/CustomKanban/CustomKanban";
import React, { useEffect, useState } from "react";

export default function TimeAnalysis() {
  const [columns, setColumns] = useState();
  const [total, setTotal] = useState();
  const [pending, setPending] = useState();
  const [completed, setCompleted] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setTotal(response.total);
        setPending(response.pending);
        setCompleted(response.completed);
        setColumns(response.tasks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("Columns:", columns);

  return (
    <div>
      <CustomKanban 
        tasks={columns}
      />
    </div>
  );
}
