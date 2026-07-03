const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

app.use(express.json());

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

// PRISMA CHANGE: GET /tasks now reads from PostgreSQL instead of the array
app.get("/tasks", async (req: any, res: any) => {
    const tasksFromDatabase = await prisma.task.findMany();
    res.json(tasksFromDatabase);
});


app.post("/tasks", (req: any, res: any) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Task text is required" });
  }

  const newTask: Task = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const { text, completed } = req.body;
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (text !== undefined) {
    task.text = text;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

    res.json(task);
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
