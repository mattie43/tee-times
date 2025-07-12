import { useQuery } from "@tanstack/react-query";

export default function usePebble() {
  const queryFn = async () => {
    const res = await fetch("/api/foreup");
    const data = await res.json();
    return data;
  };

  const { data } = useQuery({
    queryKey: ["monmouth"],
    queryFn,
    initialData: [],
  });

  return { data };
}

/*
  const pebbleUrl =
    "https://phx-api-be-east-1b.kenna.io/v2/tee-times?date=2025-07-16&facilityIds=18302";

  const loginUrl =
    "https://foreupsoftware.com/index.php/api/booking/users/login";
*/
