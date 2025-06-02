import { clearAllTodosButton, todoList } from "./app.js";
import { updateTodoInStorage, deleteTodoFromStorage } from "./storage.js";

// Renders a single todo item in the DOM
export function renderTodo(todo) {
  // === Create elements ===
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  todoItem.dataset.id = todo.id;

  const todoContentWrapper = document.createElement("div");
  todoContentWrapper.className = "todo-content";

  // Create a checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "todo-checkbox";
  checkBox.checked = todo.completed;

  // Create text span
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  // Delete button
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.className = "delete-btn";
  deleteTodoBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  // === Apply visual state ===
  if (todo.completed) {
    todoItem.style.textDecoration = "line-through";
  }

  // === Attach event listeners ===
  checkBox.addEventListener("change", () => {
    todo.completed = checkBox.checked;
    updateTodoInStorage(todo.id, todo.completed);
    todoItem.style.textDecoration = todo.completed ? "line-through" : "none";
  });

  deleteTodoBtn.addEventListener("click", () => {
    todoList.removeChild(todoItem);
    deleteTodoFromStorage(todo.id);
    console.log("Deleting todo with id:", todo.id);

    updateClearButtonState();
  });

  // === Build DOM structure ===
  todoContentWrapper.appendChild(checkBox);
  todoContentWrapper.appendChild(textSpan);

  todoItem.appendChild(todoContentWrapper);
  todoItem.appendChild(deleteTodoBtn);
  todoList.append(todoItem);

  updateClearButtonState();
}

// Toggles clear-all button based on list state
export function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodosButton.classList.toggle("disabled", isEmpty);
  clearAllTodosButton.disabled = isEmpty;
}
