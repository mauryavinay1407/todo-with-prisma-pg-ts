import { PrismaClient, User as PrismaUser, Todo as PrismaTodo } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Interfaces for user and todos
interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface Todo {
  title: string;
  description: string;
  done?: boolean;
  userId: string;
}

// Creating new User
app.post('/users', async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const user = await prisma.user.create({
      data: userData
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Getting all Users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users: PrismaUser[] = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Finding a specific user
app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Updating a User
app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData: User = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userData
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
});

// Deleting a User
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Creating a new Todo
app.post('/todos', async (req: Request, res: Response) => {
  try {
    const todoData: Todo = req.body;
    const todo = await prisma.todo.create({
      data: todoData
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Error creating todo' });
  }
});

// Getting all Todos
app.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos: PrismaTodo[] = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

//Finding a todo by ID
app.get('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id }
    });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todo' });
  }
});

// Updating a Todo
app.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const todoData: Todo = req.body;
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: todoData
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Error updating todo' });
  }
});

// Deleting a Todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
