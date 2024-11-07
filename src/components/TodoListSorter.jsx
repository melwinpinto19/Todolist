import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos,resetTodoSort } from "../store/todoSlice";

const TodoListSorter = ({ isDark }) => {
  const [sortCriteria, setSortCriteria] = useState("priority");
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.tasks);

  const handleSort = () => {
    let sortedTodos = [...todos];
  
    const priorityOrder = {
      Low: 1,
      Moderate: 2,
      High: 3
    };
  
    sortedTodos.sort((a, b) => {
      if (sortCriteria === "priority") {
        // Sort by priority based on defined order
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortCriteria === "dueDate") {
        // Sort by due date
        return sortOrder === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      }
      return 0;
    });

    console.log(sortedTodos);
    
  
    dispatch(setTodos(sortedTodos));
  };
  
  return (
    <div
      className={`flex flex-wrap max-[482px]:justify-center items-center justify-between p-4 rounded-lg shadow-md max-[482px]:p-2 mb-1 gap-2 max-[545px]:justify-center ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4 mb-1">
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

      <div className="flex items-center space-x-4 mb-1">
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
      <div className="">
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

      <div className="">
        {" "}
        <button
          onClick={()=> dispatch(resetTodoSort())}
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
  );
};

export default TodoListSorter;
