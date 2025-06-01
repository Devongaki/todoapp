import { clearAllTodosButton, todoList } from "./app.js";
import { updateTodoInStorage, deleteTodoFromStorage } from "./storage.js";

// Creating ui element
export function renderTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.textContent = todo.text;
  todoItem.classList = "todo-item";
  if (todo.completed) {
    todoItem.style.textDecoration = "line-through";
  }
  // Create a checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("todo-checkbox");
  checkBox.checked = todo.completed;

  // Handle checkbox change
  checkBox.addEventListener("change", () => {
    todo.completed = checkBox.checked;
    updateTodoInStorage(todo.id, todo.completed);
    todoItem.style.textDecoration = todo.completed ? "line-through" : "none";
  });

  //   Create delete button
  todoItem.dataset.id = todo.id
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.className = "delete-btn";
  deleteTodoBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteTodoBtn.addEventListener("click", () => {
    todoList.removeChild(todoItem);
    deleteTodoFromStorage(todo.id);
    updateClearButtonState();
  });

  // Add checkbox and text to the <li>
  todoItem.appendChild(checkBox);
  todoItem.appendChild(deleteTodoBtn);

  // Append <li> to the list
  todoList.append(todoItem);

  updateClearButtonState();
}

export function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodosButton.classList.toggle("disabled", isEmpty);
  clearAllTodosButton.disabled = isEmpty;
}
