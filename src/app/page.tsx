"use client";

import useMonmouth from "@/hooks/useMonmouth";
import DatePicker from "@/components/DatePicker";
import FilterPanel from "@/components/FilterPanel";
import Card from "@/components/Card";

export default function page() {
  const { data } = useMonmouth();

  return (
    <div className="flex gap-4 p-2">
      <FilterPanel />
      <DatePicker />
      {data?.map((teeTime: any) => (
        <Card key={teeTime.id} teeTime={teeTime} />
      ))}
    </div>
  );
}
