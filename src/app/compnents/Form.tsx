"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import TodoDataBase from "../api/todoDB";
import { useBoardStore } from "../store/BoardStore";

type proptype = {
  visible: boolean;
  setOpenForm: Dispatch<SetStateAction<string>>;
  title: string;
};
const todoDb = new TodoDataBase();

const MyForm = ({ visible, setOpenForm, title }: proptype) => {
  console.log(title);
  const [formData, setFormData] = useState({
    title: "",
    fileField: null,
  });
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    if (title == "") return;
    e.preventDefault();
    let task = { title: formData.title, status: title };
    const updates = await todoDb.createTodoInDB(task);
    getBoard();
    setFormData({
        title: "",
        fileField: null,
      })
    setOpenForm("");
  };

  return (
    <div
      style={{
        display: visible ? "inline-block" : "none",
      }}
      className="p-5 z-10 fixed top-0 bottom-0 left-0 right-0  h-fit rounded-md border-1 border-black bg-blue-100 w-fit mx-auto my-auto"
    >
      <h2 className="text-black font-bold my-2 text-green-800">
        {" "}
        <center> Add to {title.toUpperCase()} list </center>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="ml-12"
            />
          </label>
        </div>

        <div className="my-3">
          <label>
            Image
            <input
              type="file"
              name="fileField"
              onChange={handleChange}
              className="ml-9"
            />
          </label>
        </div>
        <div className="flex justify-around">
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
          <button
            onClick={() => setOpenForm("")}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
