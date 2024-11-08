import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../store/modeSlice";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mode.isDark);

  const styles = {
    bgCss: isDark
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-gray-200 text-gray-800 border-gray-400",
    text: isDark ? "🌙 Dark Mode" : "☀️ Light Mode",
  };

  const handleToggle = () => {
    dispatch(toggleMode());
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full border-2 fixed top-3 right-3 ${styles.bgCss} transition duration-300 z-40`}
    >
      {styles.text}
    </button>
  );
};

export default ThemeToggler;
