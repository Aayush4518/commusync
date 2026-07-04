import { Request, Response } from "express";
import * as taskService from "../services/task.service";
import { validateTask } from "../validators/task.validator";

interface TaskPayload {
  title?: string;
  description?: string;
  status?: string;
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description = "" } = req.body as TaskPayload;
    const error = validateTask(title ?? "");

    if (error) {
      res.status(400).json({ error });
      return;
    }

    const taskTitle = title ?? "";
    const task = await taskService.createTask({
      title: taskTitle.trim(),
      description: typeof description === "string" ? description.trim() : "",
      status: "active",
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "failed to create task" });
  }
};

export const getTasks = async (_: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTask();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch tasks" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid task id" });
      return;
    }

    const task = await taskService.updateTask(id, req.body as TaskPayload);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid task id" });
      return;
    }

    const task = await taskService.deleteTask(id);

    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to delete task" });
  }
};
