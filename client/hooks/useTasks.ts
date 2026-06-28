"use client";

import { useEffect, useMemo, useState } from "react";
import { taskService } from "@/services/taskService";
import { Task, TaskDraft, TaskFilter } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const loadedTasks = await taskService.getTasks();
        setTasks(loadedTasks);
        setError(null);
      } catch (err) {
        console.error("Failed to load tasks", err);
        setError("Unable to load tasks right now.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "completed").length;

    return {
      total: tasks.length,
      completed,
      active: tasks.length - completed,
    };
  }, [tasks]);

  const addTask = async (draft: TaskDraft) => {
    try {
      const createdTask = await taskService.createTask(draft);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      setError(null);
    } catch (err) {
      console.error("Failed to add task", err);
      setError("Unable to add task right now.");
    }
  };

  const updateTask = async (id: string, draft: TaskDraft) => {
    try {
      const updatedTask = await taskService.updateTask(id, draft);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
      setError(null);
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Unable to update task right now.");
    }
  };

  const toggleTask = async (id: string) => {
    const targetTask = tasks.find((task) => task.id === id);

    if (!targetTask) {
      return;
    }

    try {
      const updatedTask = await taskService.toggleTask(id, targetTask.status);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
      setError(null);
    } catch (err) {
      console.error("Failed to toggle task", err);
      setError("Unable to update task right now.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Unable to delete task right now.");
    }
  };

  const clearCompleted = async () => {
    const completedTaskIds = tasks
      .filter((task) => task.status === "completed")
      .map((task) => task.id);

    if (completedTaskIds.length === 0) {
      return;
    }

    try {
      await Promise.all(completedTaskIds.map((id) => taskService.deleteTask(id)));
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.status !== "completed"),
      );
      setError(null);
    } catch (err) {
      console.error("Failed to clear completed tasks", err);
      setError("Unable to clear completed tasks right now.");
    }
  };

  return {
    counts,
    filter,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter,
    isLoading,
    error,
  };
}
