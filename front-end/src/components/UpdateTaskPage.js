import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories, getTask, updateTask } from "../services";

import "./UpdateTaskPage.css";

let currentDate = new Date().toJSON().slice(0, 10);

export default function UpdateTask() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");

  const [desc, setDesc] = useState("");

  const [stDate, setStDate] = useState("");
  const [errStDate, setErrStDate] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [errDueDate, setErrDueDate] = useState("");

  const [status, setStatus] = useState("");

  const [finishedDate, setFinishedDate] = useState("");

  const [category, setCategory] = useState(
    categories && categories.length > 0 ? categories[0].id : ""
  );

  const [validPage, setValidPage] = useState(true);

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getCategories().then((res) =>
      setCategories(res && res.data && res.data.data ? res.data.data : [])
    );
    getTask(Number(param.id)).then((res) => {
      if (res && res.data && res.data.data) {
        let data = res.data.data;
        setName(data.name);
        setDesc(data.description);
        setStDate(data.start_date);
        setDueDate(data.due_date);
        setStatus(data.status);
        setFinishedDate(data.finished_date);
        setCategory(data.category_id);
        const isEmptyObj = Object.keys(data).length > 0;
        if (!isEmptyObj) setValidPage(false);
      }
    });
  }, []);

  useEffect(() => setErrName(!name ? "This field is required" : ""), [name]);

  useEffect(() => {
    if (!stDate) setErrStDate("This field is required");
    else setErrStDate("");
    if (dueDate && stDate > dueDate) setErrDueDate("Invalid date");
    else if (dueDate && stDate <= dueDate) setErrDueDate("");
  }, [stDate]);

  useEffect(() => {
    if (!dueDate) setErrDueDate("This field is required");
    else if (stDate && dueDate < stDate) setErrDueDate("Invalid date");
    else setErrDueDate("");
  }, [dueDate]);

  useEffect(() => {
    if (status !== "FINISHED") setFinishedDate("");
    else if (!finishedDate) setFinishedDate(currentDate);
  }, [status]);

  useEffect(() => {
    setErrName("");
    setErrStDate("");
    setErrDueDate("");
  }, []);

  const handleOnClickSaveBtn = async () => {
    if (!name) setErrName("This field is required");
    if (!stDate) setErrStDate("This field is required");
    if (!dueDate) setErrDueDate("This field is required");

    if (!name || !stDate || !dueDate || errName || errStDate || errDueDate)
      return;
    else {
      let res = await updateTask({
        id: Number(param.id),
        name,
        desc,
        start_date: stDate,
        due_date: dueDate,
        status,
        finished_date: finishedDate,
        category,
      });

      if (res && res.data.errCode === 0) {
        toast.success("Your task has been updated");
        navigate("/tasks");
      } else toast.error("Can't update this task :(");
    }
  };

  return (
    <div className="update-task-page-container">
      {!validPage ? (
        <div className="error-line">
          <ion-icon role="text" name="planet"></ion-icon>
          <span>Page Not Found</span>
        </div>
      ) : (
        <div className="form-section">
          <div className="input-field">
            <label htmlFor="name-field">Name</label>
            <input
              id="name-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errName ? "invalid-field" : ""}
            />
            {errName && <p className="err-line">{errName}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="desc-field">Description</label>
            <textarea
              id="desc-field"
              rows="4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="input-field haft-width" style={{ marginRight: "2%" }}>
            <label htmlFor="start-date-field">Start Date</label>
            <input
              id="start-date-field"
              type="date"
              value={stDate}
              onChange={(e) => setStDate(e.target.value)}
              className={errStDate ? "invalid-field" : ""}
            />
            {errStDate && <p className="err-line">{errStDate}</p>}
          </div>
          <div className="input-field haft-width">
            <label htmlFor="due-date-field">Due Date</label>
            <input
              id="due-date-field"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={errDueDate ? "invalid-field" : ""}
            />
            {errDueDate && <p className="err-line">{errDueDate}</p>}
          </div>
          <div className="input-field haft-width" style={{ marginRight: "2%" }}>
            <label htmlFor="status-field">Status</label>
            <select
              id="status-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="TO DO">TO DO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="FINISHED">FINISHED</option>
            </select>
          </div>
          <div className="input-field haft-width">
            <label htmlFor="finished-date-field">Finished Date</label>
            <input
              id="finished-date-field"
              disabled={status !== "FINISHED"}
              type="date"
              value={finishedDate}
              onChange={(e) => setFinishedDate(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="category-field">Category</label>
            <select
              id="category-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="btn-container">
            <button className="btn-save" onClick={handleOnClickSaveBtn}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
