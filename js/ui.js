import { clearAllTodosButton, todoList, columns } from "./dom.js";
import {
  updateTodoInStorage,
  deleteTodoFromStorage,
  saveTodos,
  getTodos,
} from "./storage.js";

// Renders a single todo item in the DOM
export function renderTodo(todo) {
  // === Create elements ===
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  todoItem.dataset.id = todo.id;

  const todoContentWrapper = document.createElement("div");
  todoContentWrapper.className = "todo-content";

  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.className = "todo-actions";

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

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editButton.className = "edit-btn";

  editButton.addEventListener("click", () => {
    todoItem.style.textDecoration = "none";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = todo.text;
    newInput.className = "edit-input";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-btn";

    checkBox.disabled = true;

    editButton.style.display = "none";

    // Replace the textSpan with the input and save button
    todoContentWrapper.replaceChild(newInput, textSpan);
    actionButtonsContainer.insertBefore(saveButton, deleteTodoBtn);

    saveButton.addEventListener("click", () => {
      const newText = newInput.value.trim();
      if (!newText) return;

      updateTodoText(todo.id, newText);

      todoList.innerHTML = "";
      getTodos().forEach(renderTodo);
    });
  });

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

const statusColumn = document.getElementById(`${todo.status}-column`);


  todoItem.draggable = true;
  todoItem.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", todo.id);
  });

  // === Build DOM structure ===
  todoContentWrapper.appendChild(checkBox);
  todoContentWrapper.appendChild(textSpan);

  actionButtonsContainer.appendChild(editButton);
  actionButtonsContainer.appendChild(deleteTodoBtn);

  todoItem.appendChild(todoContentWrapper);
  todoItem.appendChild(actionButtonsContainer);

  statusColumn.appendChild(todoItem);

  updateClearButtonState();
}

// Toggles clear-all button based on list state
export function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodosButton.classList.toggle("disabled", isEmpty);
  clearAllTodosButton.disabled = isEmpty;
}

function updateTodoText(id, newText) {
  const todos = getTodos();
  const updated = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  saveTodos(updated);
}

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", (e) => {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const newStatus = column.dataset.status;

    const list = column.querySelector("ul");
    list.appendChild(todoItem);

    const todos = getTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );

    saveTodos(updatedTodos);
  });
});
