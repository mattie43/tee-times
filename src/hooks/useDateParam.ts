import createDateString from "@/utils/createDateString";
import { useSearchParams, useRouter } from "next/navigation";

export default function useDateParam() {
  const dateString = createDateString();
  const searchParams = useSearchParams();
  const _dateParam = searchParams.get("date");
  const dateParam = _dateParam ?? dateString;
  const router = useRouter();

  const setDateParam = (date: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("date", date);
    router.push(`?${newParams.toString()}`);
  };

  return [dateParam, setDateParam] as const;
}
