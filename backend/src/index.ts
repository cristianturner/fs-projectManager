const express = require("express");
const app = express();
const PORT = 3000;

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const tasks: Task[] = [
  { id: 1, text: "Study Node.js", completed: false },
  { id: 2, text: "Create server Express", completed: false },
  { id: 3, text: "Test path backend", completed: true },
];

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});

app.delete("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const taskExist = tasks.some((task) => task.id === id);

  if (!taskExist) {
    return res.status(404).json({ message: "Task not found" });
  }

    const updatedTasks = tasks.filter((task) => task.id !== id);
    tasks.length = 0;
    tasks.push(...updatedTasks);

    res.json({ 
        message: "Task deleted successfully" ,
        tasks: tasks
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
