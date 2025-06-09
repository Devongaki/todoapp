export function formatDate(isoString) {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    console.warn("Invalid date passed to formatDate:", isoString);
    return "Invalid date";
  }
  return date.toISOString();
}
