import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const validateTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { title, status } = req.body;

  if (req.method === "POST" && (!title || typeof title !== "string")) {
    throw new ApiError(400, "Title is required");
  }

  if (title !== undefined && typeof title !== "string") {
    throw new ApiError(400, "Title must be a string");
  }

  if (status !== undefined && !["pending", "completed"].includes(status)) {
    throw new ApiError(400, "Status must be pending or completed");
  }

  next();
};
