import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ToDoListReminder = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current, { x: -100, duration: 0.5,opacity: 0 });
  });

  // Get tasks and dark mode status from Redux store
  const tasks = useSelector((state) =>
    state.todos.tasks.filter(({ dueDate,completed }) => {
      const today = new Date();
      dueDate = new Date(dueDate);
      return (
        today.getFullYear() === dueDate.getFullYear() &&
        today.getMonth() === dueDate.getMonth() &&
        today.getDate() === dueDate.getDate() && !completed
      );
    })
  );
  const isDark = useSelector((state) => state.mode.isDark);

  // Styles for colors based on task urgency (e.g., Today, Tomorrow)
  const getColor = (dueDate) => {
    const today = new Date().getDate();
    const taskDay = new Date(dueDate).getDate();
    if (taskDay === today) return "bg-blue-200"; // For today
    if (taskDay === today + 1) return "bg-orange-200"; // For tomorrow
    return "bg-pink-200"; // Other upcoming tasks
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-start p-4 ${
        isDark ? "bg-gray-900 bg-opacity-80" : "bg-black bg-opacity-50"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh] ${
          isDark ? "bg-gray-800 " : "bg-white text-gray-900"
        }`}
        ref={ref}
      >
        <h2 className="text-2xl font-bold mb-4">Today's Task Reminders</h2>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${getColor(task.dueDate)}`}
            >
              <h3 className="text-lg font-semibold mb-1 text-black">
                {task.todoType}
              </h3>
              <p className="text-sm mb-2 text-black">{task.message}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-600">
                  {new Date(task.dueDate).toDateString()}
                </span>
                <span className="font-semibold text-black">
                  {new Date(task.dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-full font-medium shadow transition transform ${
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

export default ToDoListReminder;
