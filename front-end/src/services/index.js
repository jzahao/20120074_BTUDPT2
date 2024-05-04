import axios from "axios";
import { URL } from "../backendURL";

export const getCategories = async () => {
  let res = await axios.get(`${URL}/api/get-categories`);
  return res;
};

export const addCategory = async (data) => {
  let res = await axios.post(`${URL}/api/add-category`, data);
  return res;
};

export const updateCategory = async (data) => {
  let res = await axios.put(`${URL}/api/update-category`, data);
  return res;
};

export const deleteCategory = async (id) => {
  let res = await axios.delete(`${URL}/api/delete-category`, {
    data: { id },
  });
  return res;
};

export const getTasks = async () => {
  let res = await axios.get(`${URL}/api/get-tasks`);
  return res;
};

export const getTask = async (id) => {
  let res = await axios.get(`${URL}/api/get-task?id=${id}`);
  return res;
};

export const addTask = async (data) => {
  let res = await axios.post(`${URL}/api/add-task`, data);
  return res;
};

export const updateTask = async (data) => {
  let res = await axios.put(`${URL}/api/update-task`, data);
  return res;
};

export const deleteTask = async (id) => {
  let res = await axios.delete(`${URL}/api/delete-task`, { data: { id } });
  return res;
};

export const deleteMultipleTask = async (listId) => {
  let res = await axios.delete(`${URL}/api/delete-multiple-task`, {
    data: { listId },
  });
  return res;
};
