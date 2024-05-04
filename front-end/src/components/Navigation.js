import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/categories" className="nav-link">
          Categories
        </NavLink>
        <NavLink to="/add-task" className="nav-link">
          Add Task
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          Tasks
        </NavLink>
      </div>
    </div>
  );
}
