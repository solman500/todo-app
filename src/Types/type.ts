export interface TaskItemProps {
    task: {
      id: number;
      text: string;
      status: "todo" | "inprogress" | "completed";
    };
  }

  export interface TaskColumnProps {
    title: string;
    status: "todo" | "inprogress" | "completed";
    color: string; 
  }
  

  // Task Interface
export interface Task {
    id: number;
    text: string;
    status: "todo" | "inprogress" | "completed";
  }
  
  // Zustand Store Interface
  export interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: number, text: string) => void;
    deleteTask: (id: number) => void;
    moveTask: (id: number, status: "todo" | "inprogress" | "completed") => void;
  }
  