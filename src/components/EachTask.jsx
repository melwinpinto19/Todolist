import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../store/todoSlice";
import { PriorityBadge } from "./index";
import { EachTaskViewer } from "../components/index"; // Import the TaskModal component
import { FaTrash } from "react-icons/fa";

const EachTask = ({ task, index }) => {
  const isDark = useSelector((state) => state.mode.isDark);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li
        key={task.id}
        className={`flex max-[407px]:w-screen max-h-16 items-center p-3 rounded-lg transition-all ${
          isDark
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-50 hover:bg-gray-100"
        }  `}
      >
        {/* Task Status Button */}
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

        {/* Task Message */}
        <span
          onClick={() => dispatch(toggleTaskStatus(task.id))}
          className={`max-[536px]:w-28 max-[407px]:w-20 block flex-grow max-[474px]:flex-grow-0 w-52 cursor-pointer text-ellipsis overflow-hidden text-lg max-[474px]:text-sm max-h-16  ${
            task.completed
              ? "line-through text-gray-400"
              : isDark
              ? "text-gray-300 hover:text-white"
              : "text-gray-700 hover:text-blue-600"
          } transition duration-200`}
          //   style={window.innerWidth <= 474 ? { width: "100vw" } : null}
        >
          {task.message}
        </span>

        {/* Priority Badge */}
        <div className="flex-shrink-0 mr-3">
          <PriorityBadge priority={task.priority} />
        </div>

        {/* View (Eye) Button */}
        <button
          onClick={handleViewClick}
          className={`ml-4 transition ease-in-out duration-200 ${
            isDark
              ? "text-blue-400 hover:text-blue-500"
              : "text-blue-500 hover:text-blue-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className={`ml-4 transition ease-in-out duration-200 `}
        >
          <FaTrash />
        </button>
      </li>

      {/* Task Modal */}
      {isModalOpen && (
        <EachTaskViewer
          isOpen={isModalOpen}
          onClose={closeModal}
          task={task}
          index={index}
          isDark={isDark}
        />
      )}
    </>
  );
};

export default EachTask;
