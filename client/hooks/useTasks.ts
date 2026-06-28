"use client";

import { useEffect, useMemo, useState } from "react";
import { taskService } from "@/services/taskService";
import { Task, TaskDraft, TaskFilter } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setTasks(taskService.getTasks());
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      taskService.saveTasks(tasks);
    }
  }, [isReady, tasks]);

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

  const addTask = (draft: TaskDraft) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
  };

  const updateTask = (id: string, draft: TaskDraft) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: draft.title.trim(),
              description: draft.description.trim(),
            }
          : task,
      ),
    );
  };

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "active" : "completed",
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== "completed"),
    );
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
  };
}
