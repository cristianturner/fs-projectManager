import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./style.css";
import Header from "./components/Header.tsx";

import TaskList from "./components/TaskList.tsx";
import TaskInput from "./components/TaskInput.tsx";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Study React", completed: false },
    { id: 2, text: "Practice Typescript", completed: false },
    { id: 3, text: "Understand state", completed: true },
    { id: 4, text: "Implement CSS styling", completed: false },
  ]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="app-container">
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;