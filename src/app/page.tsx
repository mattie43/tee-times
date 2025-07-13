"use client";

import useMonmouth from "@/hooks/useMonmouth";
import FilterPanel from "@/components/FilterPanel";
import Card from "@/components/Card";

export default function page() {
  const { data, isLoading } = useMonmouth();

  return (
    <div className="flex flex-1 gap-4">
      <FilterPanel />
      <div className="flex flex-1 flex-wrap gap-2 justify-center p-4">
        {isLoading && <span>Loading...</span>}
        {data?.map((teeTime: any) => (
          <Card key={teeTime.id} teeTime={teeTime} />
        ))}
      </div>
    </div>
  );
}
