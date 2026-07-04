import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "active" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const task = ret as unknown as {
      _id?: { toString: () => string };
      __v?: number;
      id?: string;
    };

    task.id = task._id?.toString() ?? "";
    delete task._id;
    delete task.__v;
    return task;
  },
});

export default mongoose.model<ITask>("Task", taskSchema);
