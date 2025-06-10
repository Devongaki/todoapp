export function applyStatusStyling(todoItem, status) {
  const content = todoItem.querySelector(".todo-content");
  const contentBtn = todoItem.querySelector(".todo-actions");
  if (!content) return;

  if (status === "done") {
    content.classList.add("done");
    contentBtn.classList.add("hidden");
  } else {
    content.classList.remove("done");
    contentBtn.classList.remove("hidden");
  }
}
