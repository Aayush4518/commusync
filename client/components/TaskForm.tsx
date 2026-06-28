"use client";

import { FormEvent, useState } from "react";
import { TaskDraft } from "@/types/task";

interface TaskFormProps {
  onAddTask: (task: TaskDraft) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Add task</h2>
        <p className="mt-1 text-sm text-slate-500">Capture one thing at a time.</p>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-slate-700">Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Review project notes"
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-slate-700">Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a little context"
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />
      </label>

      <button
        type="submit"
        disabled={!title.trim()}
        className="mt-5 w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:bg-slate-300"
      >
        Add task
      </button>
    </form>
  );
}
