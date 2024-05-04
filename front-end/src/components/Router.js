import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import Categories from "./Categories";
import AddTask from "./AddTaskPage";
import Tasks from "./Tasks";
import UpdateTask from "./UpdateTaskPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="categories" element={<Categories />} />
      <Route path="add-task" element={<AddTask />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="tasks/task-detail" element={<UpdateTask />} />
      <Route path="tasks/update-task/:id" element={<UpdateTask />} />
    </Routes>
  );
}
