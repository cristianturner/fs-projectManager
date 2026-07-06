import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/Header.tsx";
import TaskInput from "./components/TaskInput.tsx";
import TaskList from "./components/TaskList.tsx";
import Footer from "./components/Footer.tsx";



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
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        text : text
       }),
    });
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toogleTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="app-container">
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleTask={toogleTask}
      />
      <Footer 
        total={tasks.length}
        completed={completedTasks}
        pending={pendingTasks}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;