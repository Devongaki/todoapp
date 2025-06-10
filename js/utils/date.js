export function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}
