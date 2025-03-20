"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useTaskStore } from "../../../Shared/store";
import { Card } from "@/components/ui/card";
import TaskItem from "../TaskItem/TaskItem";
import { TaskColumnProps } from "@/Types/type";


const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, color }) => {
  const { tasks } = useTaskStore();

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card
      ref={setNodeRef}
      className="w-full rounded-lg shadow border p-4 min-h-[200px] bg-cyan-100"
    >
      <h2
        className={`text-lg font-bold mb-2 border rounded-lg px-2 w-fit inline-block ${color}`}
      >
        {title}
      </h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </Card>
  );
};

export default TaskColumn;
