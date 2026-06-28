"use client";

import { FormEvent, useState } from "react";
import { Task, TaskDraft } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, task: TaskDraft) => void;
}

export default function TaskItem({
  task,
  onDeleteTask,
  onToggleTask,
  onUpdateTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const createdDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(task.createdAt));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onUpdateTask(task.id, { title, description });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-teal-200 bg-white p-4 shadow-sm"
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-300"
          >
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
      <div className="flex gap-3">
        <button
          type="button"
          aria-label={task.status === "completed" ? "Mark task open" : "Mark task done"}
          onClick={() => onToggleTask(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold ${
            task.status === "completed"
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-slate-300 bg-white text-transparent hover:border-teal-500"
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3
                className={`break-words text-base font-semibold ${
                  task.status === "completed"
                    ? "text-slate-400 line-through"
                    : "text-slate-950"
                }`}
              >
                {task.title}
              </h3>
              {task.description ? (
                <p className="mt-1 break-words text-sm leading-6 text-slate-600">
                  {task.description}
                </p>
              ) : null}
            </div>

            <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {createdDate}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
