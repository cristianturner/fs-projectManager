import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

app.use(cors());
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

app.post("/register", async (req: any, res: any) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secret_key",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.get("/profile", (req: any, res: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret_key");
    res.json({
      message: "Protected profile data",
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

// PRISMA CHANGE: GET /tasks now reads from PostgreSQL instead of the array
app.get("/tasks", async (req: any, res: any) => {
    const tasksFromDatabase = await prisma.task.findMany();
    res.json(tasksFromDatabase);
});

app.post("/tasks", async (req: any, res: any) => {
  const { text } = req.body || {};

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Task text is required" });
  }

  const newTask = await prisma.task.create({
    data: {
      text,
      completed: false
    }
  });

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

//module.exports = app;
export default app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
