"use client";

import useDateParam from "@/hooks/useDateParam";

export default function DatePicker() {
  const [date, setDate] = useDateParam();

  const handleChange = (e: any) => {
    if (e.target.value !== "") {
      setDate(e.target.value);
    }
  };

  return (
    <input
      name="date-picker"
      type="date"
      value={date}
      onChange={handleChange}
      className="border border-foreground rounded-sm p-1 cursor-text"
    />
  );
}
