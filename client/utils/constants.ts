import { TaskFilter } from "@/types/task";

export const STORAGE_KEY = "mini-task-manager:tasks";

export const FILTER_OPTIONS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Open", value: "active" },
  { label: "Done", value: "completed" },
];
