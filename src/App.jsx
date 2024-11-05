import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearAllTasks } from "./store/todoSlice";
import { ToastContainer } from "react-toastify";
import { DarkModeToggler, EachTask } from "./components/index";
import { TodoModal } from "./components/index";

const TodoApp = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);
  const isDark = useSelector((state) => state.mode.isDark);
  const [isModalOpen, setModalOpen] = useState(false);

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
        <TodoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
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
              readOnly
              onClick={() => setModalOpen(true)}
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
          <ul className="space-y-4 flex-wrap gap-2 overflow-y-auto max-[474px]:flex max-[474px]:justify-center items-start ">
            {tasks.map((task) => (
              <EachTask task={task} key={task.id} />
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
