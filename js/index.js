const createTaskInput = document.getElementById("todo-input");
const createTaskButton = document.getElementById("add-todo-button");
const clearAllTodos = document.getElementById("clear-todos");
const todoList = document.querySelector(".todo-list");

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateClearButtonState();
});

// Save to local storage
function saveTodos(todosArray) {
  localStorage.setItem("todo", JSON.stringify(todosArray));
}

// Retrieve from local storage
function getTodos() {
  const todosString = localStorage.getItem("todo");
  return todosString ? JSON.parse(todosString) : [];
}

// Remove from local storage
clearAllTodos.addEventListener("click", function () {
  localStorage.removeItem("todo");
  todoList.innerHTML = "";

  updateClearButtonState()
});

function renderTodo(todoText) {
  const todoItem = document.createElement("li");
  todoItem.textContent = todoText;
  todoList.append(todoItem);
  updateClearButtonState()
}

function loadTodos() {
  const todos = getTodos();
  todos.forEach(renderTodo);
}

function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodos.classList.toggle("disabled", isEmpty);
  clearAllTodos.disabled = isEmpty;
}

createTaskButton.addEventListener("click", function () {
  const todoText = createTaskInput.value.trim();
  if (!todoText) return;

  // Update local storage
  const todos = getTodos();
  todos.push(todoText);
  saveTodos(todos);

  // Render new task
  renderTodo(todoText);
  createTaskInput.value = "";

  updateClearButtonState()
});
