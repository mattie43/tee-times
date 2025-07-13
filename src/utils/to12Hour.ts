export default function to12Hour(time24: string) {
  const [hourStr, minuteStr] = time24.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  // Decide AM / PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert 0‑23 ➜ 1‑12
  const hour12 = ((hour + 11) % 12) + 1;

  // Zero‑pad minutes just in case
  const minutePadded = minute.toString().padStart(2, "0");

  return `${hour12}:${minutePadded}${period}`;
}
