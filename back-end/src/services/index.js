const connection = require("../config/database");

const getCategoriesSV = async () => {
  try {
    let [results] = await connection.query(`SELECT * FROM categories`);
    return {
      errCode: 0,
      message: "GET CATEGORIES SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const addCategorySV = async (data) => {
  try {
    let [results] = await connection.query(
      `
    INSERT INTO categories (name, date_created)
    VALUES (?, ?)`,
      [data.name, data.date_created]
    );
    return {
      errCode: 0,
      message: "ADD CATEGORY SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const updateCategorySV = async (data) => {
  try {
    let [results] = await connection.query(
      `
    UPDATE categories
    SET name = ?
    WHERE id = ?`,
      [data.name, data.id]
    );
    return {
      errCode: 0,
      message: "UPDATE CATEGORY SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const deleteCategorySV = async (id) => {
  try {
    let [results] = await connection.query(
      `
    DELETE FROM categories WHERE id = ?`,
      [id]
    );
    return {
      errCode: 0,
      message: "DELETE CATEGORY SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const getTasksSV = async () => {
  try {
    let [results] = await connection.query(`
    SELECT T.*, C.name AS category_name 
    FROM tasks T, categories C
    WHERE T.category_id = C.id`);
    return {
      errCode: 0,
      message: "GET TASKS SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const getTaskSV = async (id) => {
  try {
    let [results] = await connection.query(`SELECT * FROM tasks WHERE id = ?`, [
      id,
    ]);
    return {
      errCode: 0,
      message: "GET TASK SUCCEED",
      data: results && results[0] ? results[0] : {},
    };
  } catch (e) {
    console.log(e);
  }
};

const addTaskSV = async (data) => {
  try {
    let [results] = await connection.query(
      `
    INSERT INTO tasks (name, description, start_date, due_date, status, finished_date, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.desc,
        data.start_date,
        data.due_date,
        "TO DO",
        null,
        data.category,
      ]
    );
    return {
      errCode: 0,
      message: "ADD TASK SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const updateTaskSV = async (data) => {
  try {
    let [results] = await connection.query(
      `
    UPDATE tasks
    SET name = ?, description = ?, start_date = ?, due_date = ?, status = ?, finished_date = ?, category_id = ?
    WHERE id = ?`,
      [
        data.name,
        data.desc,
        data.start_date,
        data.due_date,
        data.status,
        data.finished_date,
        data.category,
        data.id,
      ]
    );
    return {
      errCode: 0,
      message: "UPDATE TASK SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const deleteTaskSV = async (id) => {
  try {
    let [results] = await connection.query(
      `
    DELETE FROM tasks WHERE id = ?`,
      [id]
    );
    return {
      errCode: 0,
      message: "DELETE TASK SUCCEED",
      data: results ? results : [],
    };
  } catch (e) {
    console.log(e);
  }
};

const deleteMultipleTaskSV = async (listId) => {
  try {
    for (let i = 0; i < listId.length; i++) {
      await connection.query(`DELETE FROM tasks WHERE id = ?`, [listId[i]]);
    }
    return {
      errCode: 0,
      message: "DELETE TASKS SUCCEED",
    };
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
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
};
