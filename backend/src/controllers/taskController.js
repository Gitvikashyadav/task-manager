import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";

// @desc    Get all tasks (with search, filter, pagination)
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 9,
    search = "",
    status = "",
    priority = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const query = { userId: req.user._id };

  // Search by title or description
  if (search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by status
  if (status && ["pending", "in-progress", "completed"].includes(status)) {
    query.status = status;
  }

  // Filter by priority
  if (priority && ["low", "medium", "high"].includes(priority)) {
    query.priority = priority;
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const sortObj = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortObj).skip(skip).limit(limitNum).lean(),
    Task.countDocuments(query),
  ]);

  // Stats for the current user
  const stats = await Task.aggregate([
    { $match: { userId: req.user._id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const statsMap = { pending: 0, "in-progress": 0, completed: 0 };
  stats.forEach((s) => {
    statsMap[s._id] = s.count;
  });

  res.json({
    success: true,
    data: {
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
      stats: {
        ...statsMap,
        total: Object.values(statsMap).reduce((a, b) => a + b, 0),
      },
    },
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json({ success: true, data: { task } });
});

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title?.trim()) {
    res.status(400);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim() || "",
    status: status || "pending",
    priority: priority || "medium",
    dueDate: dueDate || null,
    userId: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: { task },
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const { title, description, status, priority, dueDate } = req.body;

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  const updated = await task.save();

  res.json({
    success: true,
    message: "Task updated successfully",
    data: { task: updated },
  });
});

// @desc    Toggle task status
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
export const toggleTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const cycle = {
    pending: "in-progress",
    "in-progress": "completed",
    completed: "pending",
  };
  task.status = cycle[task.status];
  await task.save();

  res.json({
    success: true,
    message: `Task marked as ${task.status}`,
    data: { task },
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json({
    success: true,
    message: "Task deleted successfully",
  });
});

// @desc    Delete all completed tasks
// @route   DELETE /api/tasks/completed/clear
// @access  Private
export const clearCompleted = asyncHandler(async (req, res) => {
  const result = await Task.deleteMany({
    userId: req.user._id,
    status: "completed",
  });

  res.json({
    success: true,
    message: `${result.deletedCount} completed task(s) deleted`,
  });
});
