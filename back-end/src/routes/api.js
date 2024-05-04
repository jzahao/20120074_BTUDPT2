const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteMultipleTask,
} = require("../controllers");

const apiRouter = express.Router();

apiRouter.get("/api/get-categories", getCategories);
apiRouter.post("/api/add-category", addCategory);
apiRouter.put("/api/update-category", updateCategory);
apiRouter.delete("/api/delete-category", deleteCategory);

apiRouter.get("/api/get-tasks", getTasks);
apiRouter.get("/api/get-task", getTask);
apiRouter.post("/api/add-task", addTask);
apiRouter.put("/api/update-task", updateTask);
apiRouter.delete("/api/delete-task", deleteTask);
apiRouter.delete("/api/delete-multiple-task", deleteMultipleTask);

module.exports = apiRouter;
