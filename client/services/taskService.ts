import axios from "axios";
import { Task, TaskDraft } from "@/types/task";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
  /\/+$/,
  "",
);
const TASKS_PATH = API_URL.endsWith("/tasks") ? "" : "/tasks";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const normalizeTask = (value: unknown): Task => {
  const task =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  return {
    id: String(task.id ?? task._id ?? ""),
    title: typeof task.title === "string" ? task.title : "",
    description: typeof task.description === "string" ? task.description : "",
    status: task.status === "completed" ? "completed" : "active",
    createdAt:
      typeof task.createdAt === "string" || task.createdAt instanceof Date
        ? new Date(task.createdAt).toISOString()
        : new Date().toISOString(),
  };
};

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await client.get<Task[]>(TASKS_PATH);
    const payload = Array.isArray(response.data) ? response.data : [];

    return payload.map((task) => normalizeTask(task));
  },

  async createTask(draft: TaskDraft): Promise<Task> {
    const response = await client.post<Task>(TASKS_PATH, {
      title: draft.title.trim(),
      description: draft.description.trim(),
    });

    return normalizeTask(response.data);
  },

  async updateTask(id: string, draft: TaskDraft): Promise<Task> {
    const response = await client.patch<Task>(`${TASKS_PATH}/${id}`, {
      title: draft.title.trim(),
      description: draft.description.trim(),
    });

    return normalizeTask(response.data);
  },

  async toggleTask(id: string, currentStatus: Task["status"]): Promise<Task> {
    const response = await client.patch<Task>(`${TASKS_PATH}/${id}`, {
      status: currentStatus === "completed" ? "active" : "completed",
    });

    return normalizeTask(response.data);
  },

  async deleteTask(id: string): Promise<void> {
    await client.delete(`${TASKS_PATH}/${id}`);
  },
};
