import "./TaskDetailPage.css";

export default function TaskDetail({
  taskName,
  desc,
  sDate,
  dDate,
  taskStatus,
  fDate,
  category,
  toggle,
}) {
  return (
    <div className="task-detail-page-container" onClick={toggle}>
      <div className="task-detail-content">
        <div className="task-detail-header">
          <span>Task Detail</span>
          <button onClick={toggle}>
            <ion-icon name="close-circle"></ion-icon>
          </button>
        </div>
        <div className="task-detail">
          <ul>
            <li>
              <b>Name:</b> <p>{taskName}</p>
            </li>
            <li>
              <b>Description:</b> <p>{desc}</p>
            </li>
            <li>
              <b>Start Date:</b> <p>{sDate}</p>
            </li>
            <li>
              <b>Due Date:</b> <p>{dDate}</p>
            </li>
            <li>
              <b>Category:</b> <p>{category}</p>
            </li>
            <li>
              <b>Status:</b> <p>{taskStatus}</p>
            </li>
            <li>
              <b>Finished Date:</b> <span>{fDate}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
