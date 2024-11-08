export const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const clearTodos = () => {
  localStorage.removeItem("todos");
};

export const getRewards = () => {
  const storedRewards = localStorage.getItem("rewards");
  return storedRewards ? JSON.parse(storedRewards) : {};
};

export const setRewards = (rewards) => {
  localStorage.setItem("rewards", JSON.stringify(rewards));
};
