import { STORAGE_KEY } from "@/utils/constants";
import { Task } from "@/types/task";

export const taskService = {
  getTasks(): Task[] {
    if (typeof window === "undefined") {
      return [];
    }

    const storedTasks = window.localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  },

  saveTasks(tasks: Task[]): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },
};
