import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AddTaskPage.css";
import "../assets/styles/input.css";

import { getCategories, addTask } from "../services";

let currentDate = new Date().toJSON().slice(0, 10);

export default function AddTask() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");

  const [desc, setDesc] = useState("");

  const [stDate, setStDate] = useState(currentDate);
  const [errStDate, setErrStDate] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [errDueDate, setErrDueDate] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res && res.data && res.data.data ? res.data.data : []);
      setCategory(
        res && res.data && res.data.data && res.data.data.length > 0
          ? res.data.data[0].id
          : ""
      );
    });
  }, []);

  const handleOnClickAddBtn = async () => {
    if (!name) setErrName("This field is required");
    if (!stDate) setErrStDate("This field is required");
    if (!dueDate) setErrDueDate("This field is required");

    if (!name || !stDate || !dueDate || errName || errStDate || errDueDate)
      console.log("FAILED");
    else {
      let res = await addTask({
        name,
        desc,
        start_date: stDate,
        due_date: dueDate,
        category,
      });

      if (res && res.data.errCode === 0) {
        toast.success("Your task has been added");
        setName("");
        setDesc("");
        setStDate("");
        setDueDate("");
        setErrName("");
        setErrStDate("");
        setErrDueDate("");
      } else toast.error("Can't add your task :(");
    }
  };

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
    setErrName("");
    setErrStDate("");
    setErrDueDate("");
  }, []);

  return (
    <div className="add-task-page-container">
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
          <button className="btn-add" onClick={handleOnClickAddBtn}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
