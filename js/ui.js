import { columns } from "./dom.js";
import { saveTodos, getTodos } from "./storage.js";
import {
  handleCheckboxCheckout,
  handleEditClick,
  handleDeleteClick,
  updateClearButtonState,
  handleDragOver,
  handleDragAndLeave,
  handleDrop,
} from "./handlers.js";
import { formatDate } from "./utils/date.js";

export function renderTodo(todo) {
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

  const timeStamp = document.createElement("small");
  timeStamp.className = "todo-timestamp";
  timeStamp.textContent = formatDate(todo.createdAt);

  // Delete button
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.className = "delete-btn";
  deleteTodoBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editButton.className = "edit-btn";

  editButton.addEventListener("click", () => {
    handleEditClick(
      todoItem,
      todo,
      todoContentWrapper,
      actionButtonsContainer,
      checkBox,
      textSpan,
      deleteTodoBtn,
      editButton
    );
  });

  // keyboard accesibitity
  todoItem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
    }
    if (e.key === "Escape") {
    }
  });

  if (todo.completed) {
    todoItem.style.textDecoration = "line-through";
  }

  checkBox.addEventListener("change", () => {
    handleCheckboxCheckout(todo, checkBox, todoItem);
  });

  deleteTodoBtn.addEventListener("click", () =>
    handleDeleteClick(todoItem, todo, todoItem)
  );

  const statusColumn = document.getElementById(`${todo.status}-column`);

  todoItem.draggable = true;
  todoItem.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", todo.id);
  });

  todoContentWrapper.appendChild(checkBox);
  todoContentWrapper.appendChild(textSpan);

  actionButtonsContainer.appendChild(editButton);
  actionButtonsContainer.appendChild(deleteTodoBtn);

  todoItem.appendChild(todoContentWrapper);
  todoItem.appendChild(actionButtonsContainer);
  todoItem.appendChild(timeStamp);

  statusColumn.appendChild(todoItem);

  updateClearButtonState();
}

export function updateTodoText(id, newText) {
  const todos = getTodos();
  const updated = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  saveTodos(updated);
}

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    handleDragOver(e, column);
  });
  column.addEventListener("dragleave", (e) => {
    handleDragAndLeave(e, column);
  });
  column.addEventListener("drop", (e) => {
    handleDrop(e, column);
  });
});
