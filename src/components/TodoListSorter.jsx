import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, resetTodoSort } from "../store/todoSlice";
import { AiOutlineFunnelPlot } from "react-icons/ai";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TodoFilter from "./TodoFilter";

const TodoListSorter = ({ isDark }) => {
  const [sortCriteria, setSortCriteria] = useState("priority");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openFilter, setFilterOpen] = useState(false);
  const reference = useRef(null);

  useGSAP(() => {
    gsap.from(reference.current, {
      x: 100,
      duration: 0.5,
      delay: 0.5,
    });
  });

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.tasks);

  const handleSort = () => {
    let sortedTodos = [...todos];

    const priorityOrder = {
      Low: 1,
      Moderate: 2,
      High: 3,
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
    <>
      {openFilter && (
        <TodoFilter
          sortCriteria={sortCriteria}
          setFilterOpen={setFilterOpen}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          setSortCriteria={setSortCriteria}
          handleSort={handleSort}
        />
      )}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className={`px-4 py-2 mb-2 rounded-lg font-medium shadow transition-transform transform hover:scale-105 text-right ${
            isDark
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <AiOutlineFunnelPlot />
        </button>
      </div>
    </>
  );
};

export default TodoListSorter;
