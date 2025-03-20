"use client";
import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTaskStore } from "../../../Shared/store";
import TaskColumn from "../TaskColumn/TaskColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Todo = () => {
  const { addTask, moveTask } = useTaskStore();
  const [text, setText] = React.useState<string>("");

  const handleAddTask = () => {
    if (text.trim() === "") return;
    addTask({ id: Date.now(), text, status: "todo" });
    setText("");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      moveTask(
        Number(active.id),
        over.id as "todo" | "inprogress" | "completed"
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center ">
        <Image src="/todo.avif" alt="ToDo List" width={200} height={200}  className="dark:rounded-lg"/>
        <h1 className="text-2xl font-bold text-center mb-10">ToDo List App</h1>
      </div>

      {/* Input and Add Task Button */}
      <div className="w-full flex justify-between items-center space-x-2 max-w-lg mx-auto p-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5 mt-16 mx-5 sm:mx-10">
        <TaskColumn
          title="To Do"
          status="todo"
          color="bg-blue-100 border-blue-500 dark:text-black"
        />
        <TaskColumn
          title="In Progress"
          status="inprogress"
          color="bg-yellow-100 border-yellow-500 dark:text-black"
        />
        <TaskColumn
          title="Completed"
          status="completed"
          color="bg-green-100 border-green-500 dark:text-black"
        />
      </div>
    </DndContext>
  );
};
export default Todo;
