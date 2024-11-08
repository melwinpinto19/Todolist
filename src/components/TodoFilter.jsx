import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { resetTodoSort, setTodos } from "../store/todoSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { resetTodoSort } from "../store/todoSlice";
import {FaTimes} from "react-icons/fa";

const TodoFilter = ({
  setSortCriteria,
  sortCriteria,
  sortOrder,
  setSortOrder,
  handleSort,
  setFilterOpen
}) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mode.isDark);

  const reference = useRef(null);

  useGSAP(() => {
    gsap.from(reference.current, { x: 200, duration: 0.5 });
  });

  return (
    <div
      className={`flex fixed z-50 right-1 flex-wrap  top-60 p-2 rounded-sm shadow-md  mb-1 gap-2 w-80 h-40 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
      ref={reference}
    >
      <div className=" w-full h-full  relative">
      <div className="absolute top-1 right-1"><FaTimes onClick={() => {setFilterOpen(false)}}/></div>
        <div className="flex left-14 absolute items-center space-x-4 mb-1">
          <label className="font-semibold">Sort by:</label>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className={`rounded-lg p-2 ${
              isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
            }`}
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="flex absolute bottom-1 left-1 items-center space-x-4 mb-1">
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className={`px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 ${
              isDark
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
        <div className="absolute bottom-1 left-36">
          {" "}
          <button
            onClick={handleSort}
            className={`px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 mb-1  ${
              isDark
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Apply
          </button>
        </div>

        <div className="absolute bottom-1 right-0">
          {" "}
          <button
            onClick={() => dispatch(resetTodoSort())}
            className={`px-4 py-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 mb-1  ${
              isDark
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
