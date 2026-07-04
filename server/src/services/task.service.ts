import TaskModel from "../models/task.model";

interface CreateTaskInput {
  title: string;
  description?: string;
  status?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: string;
}

const toTaskResponse = (task: any) => ({
  id: task._id?.toString() ?? task.id,
  title: task.title,
  description: task.description ?? "",
  status: task.status,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

export const createTask = async (input: CreateTaskInput) => { //for DB
  const task = await TaskModel.create({
    title: input.title,
    description: input.description ?? "",
    status: input.status ?? "active",
  });

  return toTaskResponse(task);
};

export const getAllTask = async () => {
  const tasks = await TaskModel.find().sort({ createdAt: -1 });
  return tasks.map((task) => toTaskResponse(task));
};

export const updateTask = async (id: string, updates: UpdateTaskInput) => {
  const updatePayload: Record<string, string> = {};

  if (typeof updates.title === "string") {
    updatePayload.title = updates.title.trim();
  }

  if (typeof updates.description === "string") {
    updatePayload.description = updates.description.trim();
  }

  if (updates.status === "active" || updates.status === "completed") {
    updatePayload.status = updates.status;
  }

  const task = await TaskModel.findByIdAndUpdate(id, updatePayload, { new: true });
  return task ? toTaskResponse(task) : null;
};

export const deleteTask = async (id: string) => {
  return await TaskModel.findByIdAndDelete(id);
};
