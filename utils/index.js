export function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}
