import { todoList, createTaskInput } from "./app.js";
import { updateClearButtonState, renderTodo } from "./ui.js";
import { clearAllTodos, getTodos, saveTodos } from "./storage.js";

// Function to create a new todo
export function createTask() {
  const todoText = createTaskInput.value.trim();
  if (!todoText) return;

  // Update local storage
  const todos = getTodos();
  todos.push({ id: crypto.randomUUID(), text: todoText, completed: false });
  saveTodos(todos);

  // Render new task
  renderTodo({ text: todoText, completed: false });
  createTaskInput.value = "";

  updateClearButtonState();
}

export function clearAllTodoFunction() {
  clearAllTodos();
  todoList.innerHTML = "";

  updateClearButtonState();
}
