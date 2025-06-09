import { renderTodo } from "./ui.js";
import { getTodos } from "./storage.js";
import { clearAllTodoFunction, createTask } from "./events.js";
import { createTaskButton, clearAllTodosButton } from "./dom.js";
import { updateClearButtonState } from "./handlers.js";

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateClearButtonState();
});

function loadTodos() {
  const todos = getTodos();
  todos.forEach(renderTodo);
}

createTaskButton.addEventListener("click", createTask);
clearAllTodosButton.addEventListener("click", clearAllTodoFunction);
