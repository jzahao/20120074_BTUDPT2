import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getTasks, deleteTask, deleteMultipleTask } from "../services";

import TaskDetail from "./TaskDetailPage";

import "./Tasks.css";
import "../assets/styles/common.css";
import "../assets/styles/table.css";

export default function Tasks() {
  const [taskList, setTaskList] = useState([]);

  const [taskListSort, setTaskListSort] = useState([...taskList] || []);

  const [listDeleted, setListDelete] = useState([]);

  const [taskDetail, setTaskDetail] = useState("");
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then((res) => {
      setTaskList(res && res.data.data ? res.data.data : []);
      setTaskListSort(res && res.data.data ? res.data.data : []);
    });
  }, []);

  const handleOnChangeSearch = (e) => {
    if (!e.target.value) setTaskListSort([...taskList] || []);
    else
      setTaskListSort(
        (taskList &&
          taskList.length > 0 &&
          taskList.filter(
            (item) =>
              item.name.includes(e.target.value) ||
              item.name.toLowerCase().includes(e.target.value) ||
              item.name.toUpperCase().includes(e.target.value) ||
              (item.description && item.description.includes(e.target.value)) ||
              (item.description &&
                item.description.toLowerCase().includes(e.target.value)) ||
              (item.description &&
                item.description.toUpperCase().includes(e.target.value)) ||
              item.status.includes(e.target.value) ||
              item.status.toLowerCase().includes(e.target.value) ||
              item.status.toUpperCase().includes(e.target.value) ||
              item.start_date.includes(e.target.value) ||
              item.due_date.includes(e.target.value) ||
              (item.finished_date &&
                item.finished_date.includes(e.target.value)) ||
              item.category_id === Number(e.target.value)
          )) ||
          []
      );
  };

  const handleChooseAllCheckBox = (e) => {
    let ele = document.getElementsByName("chk");
    if (e.target.checked) {
      let copyList = [];
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type === "checkbox") ele[i].checked = true;
        copyList = [...copyList, Number(ele[i].value)];
      }
      setListDelete([...copyList]);
    } else {
      setListDelete([]);
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type === "checkbox") ele[i].checked = false;
      }
    }
  };

  const handleCheckBoxChange = (e) => {
    if (e.target.checked)
      setListDelete((pre) => [...pre, Number(e.target.value)]);
    else {
      let ele = document.getElementById("chkAll");
      ele.checked = false;
      setListDelete((pre) =>
        pre.filter((item) => item !== Number(e.target.value))
      );
    }
  };

  const handleOnClickDeleteAllSelected = async () => {
    if (listDeleted.length > 0) {
      let res = await deleteMultipleTask(listDeleted);
      if (res.data.errCode === 0) {
        toast.success("Your tasks have been deleted");
        getTasks().then((res) => {
          setTaskList(res && res.data.data ? res.data.data : []);
          setTaskListSort(res && res.data.data ? res.data.data : []);
        });
      } else toast.error("Can't delete these tasks :(");
    }
  };

  const handleOnClickDeleteBtn = async (id) => {
    let res = await deleteTask(id);
    if (res && res.data.errCode === 0) {
      toast.success("Task has been deleted");
      getTasks().then((res) => {
        setTaskList(res && res.data.data ? res.data.data : []);
        setTaskListSort(res && res.data.data ? res.data.data : []);
      });
    } else toast.error("Can't delete this task :(");
  };

  const handleHideTaskDetail = () => setShowTaskDetail(false);

  return (
    <div className="tasks-page-container">
      <div className="tasks-page-content">
        <div className="search-container">
          <div className="search-field">
            <ion-icon name="search"></ion-icon>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => handleOnChangeSearch(e)}
            />
          </div>
          <div className="btn-delete-all-selected-container">
            <button
              className="btn-delete-all-selected"
              onClick={handleOnClickDeleteAllSelected}
            >
              Delete all selected
              {listDeleted.length > 0 && <span>({listDeleted.length})</span>}
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="th-check-box">
                  <input
                    type="checkbox"
                    id="chkAll"
                    onChange={(e) => handleChooseAllCheckBox(e)}
                  />
                </th>
                <th className="text-align-left">Name</th>
                <th className="text-align-left">Description</th>
                <th className="text-align-center">Start Date</th>
                <th className="text-align-center">Due Date</th>
                <th className="text-align-center">Category</th>
                <th className="text-align-center">Status</th>
                <th className="text-align-center">Finish Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {taskListSort &&
                taskListSort.length > 0 &&
                taskListSort.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="th-check-box">
                        <input
                          checked={listDeleted.includes(item.id) ? true : false}
                          type="checkbox"
                          name="chk"
                          value={item.id}
                          onChange={(e) => handleCheckBoxChange(e)}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td
                        className="text-align-center"
                        style={{ minWidth: "110px" }}
                      >
                        {item.start_date}
                      </td>
                      <td
                        className="text-align-center"
                        style={{ minWidth: "110px" }}
                      >
                        {item.due_date}
                      </td>
                      <td
                        className="text-align-center"
                        style={{ minWidth: "100px" }}
                      >
                        {item.category_name}
                      </td>

                      <td
                        className="text-align-center"
                        style={{ minWidth: "120px" }}
                      >
                        {item.status}
                      </td>
                      <td
                        className="text-align-center"
                        style={{ minWidth: "110px" }}
                      >
                        {item.finished_date}
                      </td>
                      <td
                        className="text-align-center"
                        style={{ minWidth: "160px" }}
                      >
                        <button
                          className="btn-action view"
                          onClick={() => {
                            setShowTaskDetail(true);
                            setTaskDetail(item);
                          }}
                        >
                          <ion-icon name="eye" />
                        </button>
                        <button
                          className="btn-action edit"
                          onClick={() =>
                            navigate(`/tasks/update-task/${item.id}`)
                          }
                        >
                          <ion-icon name="pencil" />
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => handleOnClickDeleteBtn(item.id)}
                        >
                          <ion-icon name="trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {showTaskDetail && (
        <TaskDetail
          taskName={taskDetail.name}
          desc={taskDetail.description}
          sDate={taskDetail.start_date}
          dDate={taskDetail.due_date}
          taskStatus={taskDetail.status}
          fDate={taskDetail.finished_date}
          category={taskDetail.category_name}
          toggle={handleHideTaskDetail}
        />
      )}
    </div>
  );
}
