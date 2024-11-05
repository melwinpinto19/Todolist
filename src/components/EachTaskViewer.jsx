import React from "react";
import { FaTimes } from "react-icons/fa"; // Import a close icon for the button
import { AiOutlineCalendar } from "react-icons/ai"; // Import a calendar icon for due date badge

const EachTaskViewer = ({ isOpen, onClose, task, index, isDark }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity ${
        isDark ? "bg-gray-900 bg-opacity-80" : "bg-black bg-opacity-50"
      }`}
    >
      <div
        className={`w-full max-w-lg p-6 rounded-2xl shadow-lg transform transition-all duration-300 ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Task Details</h2>
          <button onClick={onClose} aria-label="Close modal">
            <FaTimes
              className={`text-2xl transition transform ${
                isDark
                  ? "text-gray-400 hover:text-red-500"
                  : "text-gray-600 hover:text-red-600"
              }`}
            />
          </button>
        </div>

        <div className="space-y-4">
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500">Todo Type:</strong>
            <span>{task.todoType}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500">Message:</strong>
            <span>{task.message}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500">Priority:</strong>
            <span className={`font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500">Status:</strong>
            <span
              className={`font-medium ${
                task.completed ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500">Type:</strong>
            <span>{task.todoType}</span>
          </p>

          {/* Due Date Badge */}
          {new Date(task.dueDate).getDate() === new Date().getDate() &&
            !task.completed && (
              <div className="flex items-center space-x-2 bg-red-500 text-white p-2 rounded-lg shadow">
                <AiOutlineCalendar className="text-lg" />
                <span className="font-semibold">Due Date: Today</span>
              </div>
            )}
          {new Date(task.dueDate).getDate() === new Date().getDate() + 1 &&
            !task.completed && (
              <div className="flex items-center space-x-2 bg-yellow-500 text-white p-2 rounded-lg shadow">
                <AiOutlineCalendar className="text-lg" />
                <span className="font-semibold">Due Date: Tomorrow</span>
              </div>
            )}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className={`flex items-center px-5 py-2 rounded-full font-medium shadow transition transform ${
              isDark
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function for priority color
const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export default EachTaskViewer;
