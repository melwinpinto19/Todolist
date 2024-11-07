import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa"; // Import a close icon for the button
import { AiOutlineCalendar } from "react-icons/ai"; // Import a calendar icon for due date badge
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EachTaskViewer = ({ isOpen, onClose, task, index, isDark }) => {
  if (!isOpen) return null;
  const dueDateData = {
    years: new Date(task.dueDate).getFullYear(),
    months: new Date(task.dueDate).getMonth(),
    days: new Date(task.dueDate).getDate(),
    hours: new Date(task.dueDate).getHours(),
    minutes: new Date(task.dueDate).getMinutes(),
    seconds: new Date(task.dueDate).getSeconds(),
  };
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current, { duration: 0.5, opacity: 0, scale: 0 });
  });
  const compareDate = (dueDate) => {
    const today = new Date();
    dueDate = new Date(dueDate);

    if (
      today.getFullYear() === dueDate.getFullYear() &&
      today.getMonth() === dueDate.getMonth() &&
      today.getDate() === dueDate.getDate()
    ) {
      return {
        text: "Due Today",
        color: "bg-red-500",
      };
    } else if (
      today.getFullYear() === dueDate.getFullYear() &&
      today.getMonth() === dueDate.getMonth() &&
      today.getDate() + 1 === dueDate.getDate()
    ) {
      return {
        text: "Due Tomorrow",
        color: "bg-yellow-500",
      };
    } else if (
      today.getFullYear() > dueDate.getFullYear() ||
      today.getMonth() > dueDate.getMonth() ||
      today.getDate() > dueDate.getDate()
    ) {
      return {
        text: "Overdue",
        color: "bg-red-500",
      };
    } else {
      const date = {
        days: dueDate.getDate() - today.getDate(),
        months: dueDate.getMonth() - today.getMonth(),
        years: dueDate.getFullYear() - today.getFullYear(),
      };
      const { years, months, days } = date;

      const str = `${
        years > 0
          ? `${years} years `
          : months > 0
          ? `${months} months `
          : days > 0
          ? `${days} days `
          : ""
      }`;
      console.log(str);

      return {
        text: `Due Date is ${str} away`,
        color: "bg-" + `${isDark ? "black" : "black"}`,
      };
    }
  };

  return (
    <div
      className={`fixed max-[359px]:px-2 max-[347px]:pr-1 inset-0 w-screen h-screen  z-50 flex items-center justify-center p-4  ${
        isDark ? "bg-gray-900 bg-opacity-80" : "bg-gray-50 bg-opacity-50"
      }`}
    >
      <div
        className={`w-full max-w-lg p-6 rounded-2xl shadow-lg  ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        ref={ref}
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
            <strong className="text-gray-500 w-24 text-left">Todo Type</strong>
            <span>:</span>
            <span>{task.todoType}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500 w-24 text-left">Message</strong>
            <span>:</span>
            <span>{task.message}</span>
          </p>

          <p className="flex items-center space-x-2">
            <strong className="text-gray-500 w-24 text-left">Due date</strong>
            <span>:</span>
            <span>
              {new Date(task.dueDate).toLocaleDateString()}{" "}
              {dueDateData.hours % 12}:
              {dueDateData.minutes.toString().length === 1
                ? new Date(task.dueDate).getMinutes() + "0"
                : dueDateData.minutes}{" "}
              {dueDateData.hours > 12 ? "PM" : "AM"}
            </span>
          </p>

          <p className="flex items-center space-x-2">
            <strong className="text-gray-500 w-24 text-left">Priority</strong>
            <span>:</span>
            <span className={`font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500 w-24 text-left">Status</strong>
            <span>:</span>
            <span
              className={`font-medium ${
                task.completed ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="text-gray-500 w-24 text-left">Type</strong>
            <span>:</span>
            <span>{task.todoType}</span>
          </p>

          {/* Due Date Badge */}
          {!task.completed && (
            <div
              className={`flex items-center space-x-2 ${
                compareDate(task.dueDate).color
              } text-white p-2 rounded-lg shadow`}
            >
              <AiOutlineCalendar className="text-lg" />
              <span className="font-semibold">
                {compareDate(task.dueDate).text}
              </span>
            </div>
          )}
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
