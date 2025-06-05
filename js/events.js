import { todoList, createTaskInput } from "./dom.js";
import { updateClearButtonState, renderTodo } from "./ui.js";
import { clearAllTodos, getTodos, saveTodos } from "./storage.js";

// Function to create a new todo
export function createTask() {
  const todoText = createTaskInput.value.trim();
  if (!todoText) return;

  // Update local storage
  const todos = getTodos();
  const newTodo = {
    id: crypto.randomUUID(),
    text: todoText,
    completed: false,
    status: 'todo'
  };
  todos.push(newTodo);
  saveTodos(todos);

  // Render new task
  renderTodo(newTodo);
  createTaskInput.value = "";

  updateClearButtonState();
}

export function clearAllTodoFunction() {
  clearAllTodos();
  todoList.innerHTML = "";

  updateClearButtonState();
}
