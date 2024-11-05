import React from "react";

const PriorityBadge = ({ priority }) => {
  // Define the colors based on priority
  const getBadgeStyle = () => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 text-white";
      case "moderate":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="w-28 text-center max-[474px]:text-sm">
      <span
        className={`px-3 py-1 rounded-full text-sm text-center font-semibold ${getBadgeStyle()}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    </div>
  );
};

export default PriorityBadge;
