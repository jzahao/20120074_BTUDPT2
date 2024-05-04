import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page-container">
      <div className="tag">
        <Link to="/categories" className="tag-link">
          Categories
        </Link>
      </div>
      <div className="tag">
        <Link to="/add-task" className="tag-link">
          Add Task
        </Link>
      </div>
      <div className="tag">
        <Link to="/tasks" className="tag-link">
          List Task
        </Link>
      </div>
    </div>
  );
}
