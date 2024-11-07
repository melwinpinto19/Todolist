import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../store/todoSlice";

const TodoModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [todoType, setTodoType] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("Moderate");
  const [todoMessage, setTodoMessage] = useState("");
  const isDarkMode = useSelector((state) => state.mode.isDark);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    todoType: false,
    dueDate: false,
    priority: false,
    todoMessage: false,
  });

  const checkIfTheFieldsAreFilled = () => {
    if (!todoType && step === 1) {
      setError({ ...error, todoType: true });
      return;
    }
    if (!dueDate && step === 2) {
      setError({ ...error, dueDate: true });
      return;
    }
    if (!priority && step === 3) {
      setError({ ...error, priority: true });
      return;
    }
    if (!todoMessage && step === 4) {
      setError({ ...error, todoMessage: true });
      return;
    }

    return 1;
  };

  const handleNext = () => {
    if (checkIfTheFieldsAreFilled() === 1) setStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const resetModalData = () => {
    setStep(1);
    setTodoType("");
    setDueDate(new Date());
    setPriority("Moderate");
    setTodoMessage("");
  };

  return (
    isOpen && (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isDarkMode ? "bg-gray-900 bg-opacity-80" : "bg-gray-500 bg-opacity-50"
        }`}
      >
        <div
          className={`p-6 relative rounded-lg shadow-lg w-11/12 max-w-md ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              onClose();
              resetModalData();
            }}
            className={`absolute top-3 right-3 text-xl bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition duration-200`}
          >
            &times;
          </button>

          {/* Step 1: Select Type */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select Todo Type</h2>
              {error.todoType && (
                <p className="text-red-500 my-2">* todo type is required</p>
              )}
              <select
                value={todoType}
                onChange={(e) => {
                  setTodoType(e.target.value);
                  if (e.target.value) setError({ ...error, todoType: false });
                  else setError({ ...error, todoType: true });
                }}
                className={`w-full p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="personal">Personal</option>
                <option value="diet">Diet</option>
                <option value="work">Work</option>
                <option value="exercise">Exercise</option>
              </select>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 2: Select Due Date */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select Due Date & Time</h2>
              {error.dueDate && (
                <p className="text-red-500 my-2">* due date & time is required</p>
              )}
              <div className='w-full flex justify-stretch'>
              <DatePicker
                selected={dueDate}
                onChange={(date) => {
                  if (date) setError({ ...error, dueDate: false });
                  else setError({ ...error, dueDate: true });
                  setDueDate(date);
                }}
                className={`w-full p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
                placeholderText="Select Date"
                dateFormat="MMMM d, yyyy"
                showTimeSelect
                timeIntervals={30}
              />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 3: Select Priority */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select Priority</h2>
              {error.priority && (
                <p className="text-red-500 my-2">* priority is required</p>
              )}
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  High
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Moderate"
                    checked={priority === "Moderate"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  Moderate
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === "Low"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  Low
                </label>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 4: Enter Todo Message */}
          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Enter Todo Message
              </h2>
              {error.todoMessage && (
                <p className="text-red-500 my-2">* todo message is required</p>
              )}
              <textarea
                value={todoMessage}
                onChange={(e) => {
                  setTodoMessage(e.target.value);
                  if (e.target.value)
                    setError({ ...error, todoMessage: false });
                  else setError({ ...error, todoMessage: true });
                }}
                placeholder="Type your todo here..."
                className={`w-full p-3 h-24 rounded-lg resize-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    // Save logic goes here
                    if (!todoMessage) {
                      setError({ ...error, todoMessage: true });
                      return;
                    }
                    dispatch(
                      addTask({ todoType, dueDate, priority, todoMessage })
                    );
                    resetModalData();
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default TodoModal;
