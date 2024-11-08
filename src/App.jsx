import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearAllTasks } from "./store/todoSlice";
import { ToastContainer } from "react-toastify";
import { DarkModeToggler, EachTask } from "./components/index";
import { TodoModal, TaskReminder, TodoListSorter } from "./components/index";

const TodoApp = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);
  const isDark = useSelector((state) => state.mode.isDark);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const rewards = useSelector((state) => state.rewards.rewards);

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
        <div className="fixed top-3 left-24 bg-black p-2 rounded-full flex gap-2 justify-center items-center">
          <i className="fa-solid fa-award"></i>

          <span>{Object.values(rewards).reduce((a, b) => a + b, 0)}</span>
        </div>
        <div
          className="fixed top-3 left-5 bg-yellow-500 p-2 rounded-full cursor-pointer"
          onClick={() => setIsReminderModalOpen(true)}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V10c0-3.07-1.63-5.64-4.5-6.32V3a1.5 1.5 0 0 0-3 0v.68C7.63 4.36 6 6.92 6 10v6l-1.7 1.7c-.3.3-.3.77 0 1.06.3.3.77.3 1.06 0L6 17.4V18h12v-.6l1.64 1.64c.3.3.77.3 1.06 0 .3-.3.3-.77 0-1.06L18 16zM12 5c2.21 0 4 1.79 4 4v6H8v-6c0-2.21 1.79-4 4-4z" />
          </svg>
        </div>

        <TaskReminder
          isOpen={isReminderModalOpen}
          onClose={() => {
            setIsReminderModalOpen(false);
          }}
        />
        <TodoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        <div className="absolute top-4 right-4">
          <DarkModeToggler />
        </div>
        <ToastContainer />
        <div
          className={`${
            isDark ? "bg-slate-800" : "bg-white"
          } rounded-3xl shadow-lg px-44 py-14 w-4/6 transition duration-200  max-[1229px]:px-5  max-[647px]:w-screen bg-transparent max-[450px]:bg-transparent max-[373px]:px-2 max-[347px]:px-1  element max-[450px]:h-auto`}
          style={{ height: "80vh" }}
        >
          {/* Dark Mode Toggle Button */}

          <h1 className="text-5xl font-bold mb-8 text-left max-[763px]:text-3xl">
            Daily To Do List
          </h1>

          <TodoListSorter isDark={isDark} />

          {/* Input and Add Button */}
          <div className="flex items-center mb-8  w-full relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new todo..."
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
          <ul className="space-y-4 flex-wrap gap-2  max-[474px]:flex max-[474px]:justify-center items-start  overflow-hidden">
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
