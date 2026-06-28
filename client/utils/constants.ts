import { TaskFilter } from "@/types/task";

export const FILTER_OPTIONS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Open", value: "active" },
  { label: "Done", value: "completed" },
];
