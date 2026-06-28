export type TaskStatus = "active" | "completed";

export type TaskFilter = "all" | TaskStatus;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskDraft {
  title: string;
  description: string;
}
