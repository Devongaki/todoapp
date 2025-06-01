// Retrieve from local storage
export function getTodos() {
  const todosString = localStorage.getItem("todo");
  return todosString ? JSON.parse(todosString) : [];
}

// Save to local storage
export function saveTodos(todosArray) {
  localStorage.setItem("todo", JSON.stringify(todosArray));
}

// Remove from local storage

export function clearAllTodos() {
  localStorage.removeItem("todo");
}

export function updateTodoInStorage(todoText, completed) {
  const todos = getTodos();
  const updated = todos.map((todo) =>
    todo.text === todoText ? { ...todo, completed } : todo
  );
  saveTodos(updated);
}
