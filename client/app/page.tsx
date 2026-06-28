"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { FILTER_OPTIONS } from "@/utils/constants";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  return <TaskManager />;
}

function TaskManager() {
  const {
    counts,
    filter,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter,
  } = useTasks();

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">Mini Task Manager</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Today&apos;s tasks
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Keep the list simple, focused, and easy to clean up.
            </p>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white text-center shadow-sm">
            <div className="px-4 py-3">
              <p className="text-xl font-semibold">{counts.total}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="border-x border-slate-200 px-4 py-3">
              <p className="text-xl font-semibold">{counts.active}</p>
              <p className="text-xs text-slate-500">Open</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xl font-semibold">{counts.completed}</p>
              <p className="text-xs text-slate-500">Done</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <TaskForm onAddTask={addTask} />

          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:w-auto">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition sm:flex-none ${
                      filter === option.value
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={clearCompleted}
                disabled={counts.completed === 0}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
              >
                Clear completed
              </button>
            </div>

            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
              onUpdateTask={updateTask}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
