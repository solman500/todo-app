"use client";
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useTaskStore } from "../../../Shared/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Move } from "lucide-react";
import { TaskItemProps } from "@/Types/type";



const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(task.text);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(), // Ensure id is always a string
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
  };

  // Handle Task Update
  const handleUpdate = () => {
    if (newText.trim() === "") return;
    updateTask(task.id, newText);
    setIsEditing(false);
  };

  // Handle Task Delete
  const handleDelete = () => {
    deleteTask(task.id);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 w-full p-2 border rounded-lg bg-white dark:text-black"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab touch-none p-1"
      >
        <Move className="h-4 w-4 text-gray-400" />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col sm:flex-row gap-2 min-w-0">
        {isEditing ? (
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 min-w-[120px]"
          />
        ) : (
          <span
            className={`flex-1 ${
              !isExpanded ? "truncate text-ellipsis overflow-hidden " : ""
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            "{task.text}"
          </span>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          {isEditing ? (
            <Button
              size="sm"
              onClick={handleUpdate}
              className="w-full sm:w-auto"
            >
              Save
            </Button>
          ) : (
            <Button
              className="dark:bg-cyan-500 w-full sm:w-auto"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="destructive"
            className="dark:bg-red-600 w-full sm:w-auto"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
