import { clearAllTodosButton, todoList } from "./app.js";
import { updateTodoInStorage } from "./storage.js";

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
    updateTodoInStorage(todo.text, todo.completed);
    todoItem.style.textDecoration = todo.completed ? "line-through" : "none";
  });

  // Add checkbox and text to the <li>
  todoItem.appendChild(checkBox);

  // Append <li> to the list
  todoList.append(todoItem);

  updateClearButtonState();
}

export function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodosButton.classList.toggle("disabled", isEmpty);
  clearAllTodosButton.disabled = isEmpty;
}
