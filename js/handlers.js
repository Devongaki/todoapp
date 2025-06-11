import { updateTodoText } from "./ui.js";
import { todoList, clearAllTodosButton } from "./dom.js";
import { deleteTodoFromStorage, getTodos, saveTodos } from "./storage.js";
import { applyStatusStyling } from "./helpers/helper.js";

export function handleEditClick(
  todoItem,
  todo,
  todoContentWrapper,
  actionButtonsContainer,
  textSpan,
  deleteTodoBtn,
  editButton
) {
  todoItem.style.textDecoration = "none";

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.value = todo.text;
  newInput.className = "edit-input";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "save-btn";

  editButton.style.display = "none";

  // Replace the textSpan with the input and add save button
  todoContentWrapper.replaceChild(newInput, textSpan);
  actionButtonsContainer.insertBefore(saveButton, deleteTodoBtn);

  newInput.focus();

  saveButton.addEventListener("click", () => {
    handleSaveEdit(
      newInput,
      textSpan,
      saveButton,
      todo,
      todoContentWrapper,
      actionButtonsContainer,
      editButton
    );
  });

  newInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Cancel editing, revert UI
      if (todoContentWrapper.contains(newInput)) {
        todoContentWrapper.replaceChild(textSpan, newInput);
      }
      if (actionButtonsContainer.contains(saveButton)) {
        actionButtonsContainer.removeChild(saveButton);
      }
      editButton.style.display = "inline-block";
      newInput.blur();
    }
    if (e.key === "Enter") {
      handleSaveEdit(
        newInput,
        textSpan,
        saveButton,
        todo,
        todoContentWrapper,
        actionButtonsContainer,
        editButton
      );
    }
  });
}

export function handleSaveEdit(
  newInput,
  textSpan,
  saveButton,
  todo,
  todoContentWrapper,
  actionButtonsContainer,
  editButton
) {
  const newText = newInput.value.trim();
  if (!newText) return;

  // Update local storage
  updateTodoText(todo.id, newText);

  // Update the in-memory todo object too
  todo.text = newText;

  // Update the textSpan text content
  textSpan.textContent = newText;

  // Replace input with updated textSpan
  if (todoContentWrapper.contains(newInput)) {
    todoContentWrapper.replaceChild(textSpan, newInput);
  }

  // Remove the save button
  if (actionButtonsContainer.contains(saveButton)) {
    actionButtonsContainer.removeChild(saveButton);
  }

  editButton.style.display = "inline-block";
}

export function handleDeleteClick(todoItem, todo) {
  todoItem.remove();
  deleteTodoFromStorage(todo.id);
  updateClearButtonState();
}

export function handleDragOver(e, column) {
  e.preventDefault();
  column.classList.add("drag-over");
}

export function handleDragAndLeave(e, column) {
  e.preventDefault();
  column.classList.remove("drag-over");
}

export function handleDrop(e, column) {
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
  applyStatusStyling(todoItem, newStatus);
}

export function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodosButton.classList.toggle("disabled", isEmpty);
  clearAllTodosButton.disabled = isEmpty;
}
