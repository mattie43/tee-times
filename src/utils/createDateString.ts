export default function createDateString() {
  const today = new Date();
  // yyyy-mm-dd conversion
  const dateString = today.toISOString().split("T")[0];
  return dateString;
}
