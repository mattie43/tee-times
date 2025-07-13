function to12Hour(time24: string) {
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

export default function Card({ teeTime }: any) {
  console.log(teeTime);
  const time = to12Hour(teeTime.time.split(" ")[1]);

  return (
    <div className="flex flex-col gap-2 p-2 border border-foreground rounded-sm">
      <span className="flex gap-2">
        <span className="text-pastel-red">{teeTime.course_name}</span>
        <span>{"-"}</span>
        <span className="text-pastel-orange">{time}</span>
      </span>
      <span className="text-pastel-yellow">
        Open spots: {teeTime.available_spots}
      </span>
    </div>
  );
}
