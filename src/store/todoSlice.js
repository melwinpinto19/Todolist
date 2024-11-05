// store/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadTodos, saveTodos, clearTodos } from "../utils/localStorage";
// import { toast } from "react-toastify";

// Initialize state with data from localStorage
const initialState = {
  tasks: loadTodos(),
};

// Create the slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        todoType: action.payload.todoType,
        message: action.payload.todoMessage,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        completed: false,
      };
      state.tasks.push(newTask);
      saveTodos(state.tasks);

      // toast.success("Task added successfully!", {
      //   position: "bottom-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    },

    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTodos(state.tasks);
    },

    // Clear all tasks
    clearAllTasks: (state) => {
      state.tasks = [];
      clearTodos();
    },

    // Toggle task completion status
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTodos(state.tasks);
      }
    },
  },
});

// Export actions and reducer
export const { addTask, deleteTask, clearAllTasks, toggleTaskStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
