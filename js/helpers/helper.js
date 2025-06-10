export function applyStatusStyling(todoItem, status) {
  const content = todoItem.querySelector(".todo-content");
  if (!content) return;

  if (status === "done") {
    content.classList.add("done");
  } else {
    content.classList.remove("done");
  }
}
