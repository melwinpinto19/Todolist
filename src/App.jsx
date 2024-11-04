import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  clearAllTasks,
  toggleTaskStatus,
} from "./store/todoSlice";
import { ToastContainer } from "react-toastify";
import { DarkModeToggler } from "./components/index";

const TodoApp = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);
  const isDark = useSelector((state) => state.mode.isDark);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center  ${
          isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="absolute top-4 right-4">
          <DarkModeToggler />
        </div>
        <ToastContainer />
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-3xl shadow-lg px-44 py-14 w-4/6 transition duration-200  max-[1229px]:px-5  max-[647px]:w-screen bg-transparent`}
        >
          {/* Dark Mode Toggle Button */}

          <h1 className="text-5xl font-bold mb-8 text-left max-[763px]:text-3xl">
            Daily To Do List
          </h1>

          {/* Input and Add Button */}
          <div className="flex items-center mb-8  w-full relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new list item"
              className={`w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500"
                  : "bg-white border border-gray-300 text-gray-900 focus:ring-blue-500"
              } transition ease-in-out duration-200`}
            />
            <button
              onClick={handleAddTask}
              className={`px-4 py-2 font-medium rounded-lg shadow-md transition duration-200 absolute right-1 ${
                isDark
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center p-3 rounded-lg transition-all hover:bg-gray-100 ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50"
                }`}
              >
                <button
                  onClick={() => dispatch(toggleTaskStatus(task.id))}
                  className={`mr-3 w-6 h-6 rounded-full border-2 ${
                    task.completed
                      ? "border-green-400 bg-green-400 text-white"
                      : isDark
                      ? "border-gray-500 bg-gray-800 hover:border-gray-400"
                      : "border-gray-300 bg-white hover:border-blue-500"
                  } flex items-center justify-center transition-all duration-200`}
                >
                  {task.completed && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </button>
                <span
                  onClick={() => dispatch(toggleTaskStatus(task.id))}
                  className={`flex-grow cursor-pointer text-lg ${
                    task.completed
                      ? "line-through text-gray-400"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-blue-600"
                  } transition duration-200`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className={`ml-4 transition ease-in-out duration-200 ${
                    isDark
                      ? "text-red-400 hover:text-red-500"
                      : "text-red-500 hover:text-red-600"
                  }`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex justify-between items-center mt-8 text-gray-500">
            <span>{tasks.length} items</span>
            <button
              onClick={() => dispatch(clearAllTasks())}
              className={`transition duration-200 ${
                isDark
                  ? "text-blue-400 hover:underline"
                  : "text-blue-500 hover:underline"
              }`}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
