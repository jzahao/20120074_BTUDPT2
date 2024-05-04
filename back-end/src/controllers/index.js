const {
  getCategoriesSV,
  addCategorySV,
  updateCategorySV,
  deleteCategorySV,
  getTasksSV,
  getTaskSV,
  addTaskSV,
  updateTaskSV,
  deleteTaskSV,
  deleteMultipleTaskSV,
} = require("../services");

const getCategories = async (req, res) => {
  try {
    let result = await getCategoriesSV();
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.body.name || !req.body.date_created)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await addCategorySV(req.body);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!req.body.id || !req.body.name)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await updateCategorySV(req.body);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!req.body.id)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await deleteCategorySV(req.body.id);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let result = await getTasksSV();
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const getTask = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await getTaskSV(req.query.id);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const addTask = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.start_date ||
      !req.body.due_date ||
      !req.body.category
    )
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await addTaskSV(req.body);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.start_date ||
      !req.body.due_date ||
      !req.body.status ||
      !req.body.category
    )
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await updateTaskSV(req.body);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.body.id)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await deleteTaskSV(req.body.id);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

const deleteMultipleTask = async (req, res) => {
  try {
    if (!req.body.listId)
      return res.status(200).json({
        errCode: 1,
        message: "MISSING REQUIRED PARAMETER",
      });
    else {
      let result = await deleteMultipleTaskSV(req.body.listId);
      return res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      message: "ERROR FROM SERVER",
    });
  }
};

module.exports = {
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
};
