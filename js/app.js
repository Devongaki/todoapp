import { renderTodo, updateClearButtonState } from "./ui.js";
import { getTodos } from "./storage.js";
import { clearAllTodoFunction, createTask } from "./events.js";

export const createTaskInput = document.getElementById("todo-input");
export const createTaskButton = document.getElementById("add-todo-button");
export const clearAllTodosButton = document.getElementById("clear-todos");
export const todoList = document.querySelector(".todo-list");

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
