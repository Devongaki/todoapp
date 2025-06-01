const createTaskInput = document.getElementById("todo-input");
const createTaskButton = document.getElementById("add-todo-button");
const clearAllTodos = document.getElementById("clear-todos");
const todoList = document.querySelector(".todo-list");

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateClearButtonState();
});

function loadTodos() {
  const todos = getTodos();
  todos.forEach(renderTodo);
}

function updateClearButtonState() {
  const isEmpty = todoList.children.length === 0;
  clearAllTodos.classList.toggle("disabled", isEmpty);
  clearAllTodos.disabled = isEmpty;
}

// Retrieve from local storage
function getTodos() {
  const todosString = localStorage.getItem("todo");
  return todosString ? JSON.parse(todosString) : [];
}

// Creating ui element
function renderTodo(todo) {
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

// Save to local storage
function saveTodos(todosArray) {
  localStorage.setItem("todo", JSON.stringify(todosArray));
}

// Remove from local storage
clearAllTodos.addEventListener("click", function () {
  localStorage.removeItem("todo");
  todoList.innerHTML = "";

  updateClearButtonState();
});

function updateTodoInStorage(todoText, completed) {
  const todos = getTodos();
  const updated = todos.map((todo) =>
    todo.text === todoText ? { ...todo, completed } : todo
  );
  saveTodos(updated);
}

// Function to create a new todo
createTaskButton.addEventListener("click", function () {
  const todoText = createTaskInput.value.trim();
  if (!todoText) return;

  // Update local storage
  const todos = getTodos();
  todos.push({ text: todoText, completed: false });
  saveTodos(todos);

  // Render new task
  renderTodo({ text: todoText, completed: false });
  createTaskInput.value = "";

  updateClearButtonState();
});
