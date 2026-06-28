export default function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-xl font-semibold text-teal-700">
        +
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-950">No tasks here</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Add a task or switch filters to see what is already on your list.
      </p>
    </div>
  );
}
