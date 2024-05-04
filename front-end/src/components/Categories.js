import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Categories.css";
import "../assets/styles/common.css";
import "../assets/styles/input.css";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services";

let currentDate = new Date().toJSON().slice(0, 10);

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);

  const [rowEdit, setRowEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [errNameEdit, setErrNameEdit] = useState(false);

  useEffect(() => {
    getCategories().then((res) =>
      setCategories(res && res.data && res.data.data ? res.data.data : [])
    );
  }, []);

  const handleOnClickAddBtn = async () => {
    if (!name) setErrName(true);
    else {
      let res = await addCategory({
        name,
        date_created: currentDate,
      });

      if (res && res.data.errCode === 0) {
        toast.success("Category has been added");
        setName("");
        setErrName(false);
        getCategories().then((res) =>
          setCategories(res && res.data && res.data.data ? res.data.data : [])
        );
      }
    }
  };

  const handleOnClickSaveBtn = async (id) => {
    if (!nameEdit) setErrNameEdit(true);
    else {
      let res = await updateCategory({
        id,
        name: nameEdit,
      });
      if (res && res.data.errCode === 0) {
        toast.success("Category has been updated");
        setRowEdit("");
        setNameEdit("");
        setErrNameEdit(false);
        getCategories().then((res) =>
          setCategories(res && res.data && res.data.data ? res.data.data : [])
        );
      } else toast.error("Update failed");
    }
  };

  const handleOnClickDeleteBtn = async (id) => {
    let res = await deleteCategory(id);
    if (res && res.data.errCode === 0) {
      toast.success("Category has been deleted");
      getCategories().then((res) =>
        setCategories(res && res.data && res.data.data ? res.data.data : [])
      );
    } else toast.error("Delete failed");
  };

  console.log(currentDate);

  return (
    <div className="categories-page-container">
      <div className="categories-page-content">
        <div className="add-categoty-container">
          <div className="input-field">
            <label htmlFor="name-field">Name</label>
            <input
              id="name-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errName ? "invalid-field" : ""}
            />
          </div>
          <div className="btn-container">
            <button className="btn-add" onClick={handleOnClickAddBtn}>
              Add
            </button>
          </div>
          {errName && <p className="err-line">This field is required</p>}
        </div>
        <div className="table-container" style={{ maxHeight: "320px" }}>
          <table>
            <thead>
              <tr>
                <th className="text-align-center"></th>
                <th className="text-align-left">Name</th>
                <th className="text-align-center">Date Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.length > 0 &&
                categories.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td
                        className="text-align-center"
                        style={{ width: "60px" }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        {item.id === rowEdit ? (
                          <div
                            className="input-field"
                            style={{ marginBottom: "0" }}
                          >
                            <input
                              style={{
                                padding: "3px 6px 4px",
                                borderWidth: "1px",
                                borderRadius: "4px",
                                fontWeight: "500",
                              }}
                              id="name-field"
                              type="text"
                              value={nameEdit}
                              onChange={(e) => setNameEdit(e.target.value)}
                              className={errNameEdit ? "invalid-field" : ""}
                            />
                          </div>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td
                        className="text-align-center width-fit-content"
                        style={{ width: "120px" }}
                      >
                        {item.date_created}
                      </td>
                      <td
                        className="text-align-center"
                        style={{ width: "120px" }}
                      >
                        {item.id === rowEdit ? (
                          <button className="btn-action save">
                            <ion-icon
                              name="bookmark"
                              onClick={() => handleOnClickSaveBtn(item.id)}
                            />
                          </button>
                        ) : (
                          <button className="btn-action edit">
                            <ion-icon
                              name="pencil"
                              onClick={() => {
                                setRowEdit(item.id);
                                setNameEdit(item.name);
                              }}
                            />
                          </button>
                        )}
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
    </div>
  );
}
