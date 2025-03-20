"use client";
import Dark from "@/components/DarkMode/Dark";
import Todo from "@/components/Features/Todos/Todo";
import * as React from "react";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col">
      {/* Dark mode toggle */}
      <section className="flex justify-end m-5">
        <Dark />
      </section>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Todo />
      </main>
    </div>
  );
}
