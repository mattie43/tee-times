import { useQueries } from "@tanstack/react-query";
import useDateParam from "@/hooks/useDateParam";
import { MONMOUTH_COURSES } from "@/constants/courses";
import useCourseFilters from "./useCourseFilters";

export type TAPITeeTime = {
  time: string;
  start_front: number;
  course_id: number;
  course_name: string;
  schedule_id: number;
  teesheet_id: number;
  schedule_name: string;
  require_credit_card: boolean;
  teesheet_holes: number;
  teesheet_side_id: number;
  teesheet_side_name: string;
  teesheet_side_order: number;
  reround_teesheet_side_id: number;
  reround_teesheet_side_name: string;
  available_spots: number;
  available_spots_9: number;
  available_spots_18: number;
  maximum_players_per_booking: string;
  minimum_players: string;
  allowed_group_sizes: string[];
  holes: number;
  has_special: boolean;
  special_id: boolean;
  special_discount_percentage: number;
  group_id: boolean;
  booking_class_id: number;
  booking_fee_required: boolean;
  booking_fee_price: number;
  booking_fee_per_person: boolean;
  foreup_trade_discount_rate: number;
  trade_min_players: number;
  trade_cart_requirement: string;
  trade_hole_requirement: string;
  trade_available_players: number;
  green_fee_tax_rate: boolean;
  green_fee_tax: number;
  green_fee_tax_9: number;
  green_fee_tax_18: number;
  guest_green_fee_tax_rate: boolean;
  guest_green_fee_tax: number;
  guest_green_fee_tax_9: number;
  guest_green_fee_tax_18: number;
  cart_fee_tax_rate: boolean;
  cart_fee_tax: number;
  cart_fee_tax_9: number;
  cart_fee_tax_18: number;
  guest_cart_fee_tax_rate: boolean;
  guest_cart_fee_tax: number;
  guest_cart_fee_tax_9: number;
  guest_cart_fee_tax_18: number;
  foreup_discount: boolean;
  pay_online: string;
  green_fee: number;
  green_fee_9: number;
  green_fee_18: number;
  guest_green_fee: number;
  guest_green_fee_9: number;
  guest_green_fee_18: number;
  cart_fee: number;
  cart_fee_9: number;
  cart_fee_18: number;
  guest_cart_fee: number;
  guest_cart_fee_9: number;
  guest_cart_fee_18: number;
  rate_type: string;
  special_was_price: unknown;
  id: string;
};

export type TTeeTime = {
  available_spots: number;
  course_id: number;
  course_name: string;
  id: string;
  time: string;
  book_url: string;
  booking_class: string;
};

export default function useMonmouth() {
  const [date] = useDateParam();
  const [filters] = useCourseFilters();
  const bookUrl = "https://foreupsoftware.com/index.php/booking/20290#teetimes";

  const multiQueryFn = async (course: any) => {
    const multiUrl = `/api/foreup?date=${date}&booking_class=${course.booking_class}&schedule_id=${course.schedule_id}`;
    const res = await fetch(multiUrl);
    const data = await res.json();
    const updatedData = data.map((teeTime: TAPITeeTime) => {
      return {
        available_spots: teeTime.available_spots,
        course_id: teeTime.course_id,
        course_name: course.name,
        id: `${teeTime.booking_class_id}-${teeTime.time}`,
        booking_class: course.booking_class,
        time: teeTime.time,
        book_url: bookUrl,
      };
    });
    return updatedData;
  };

  const results = useQueries({
    queries: MONMOUTH_COURSES.map((course) => ({
      queryKey: ["monmouth", course.booking_class, date],
      queryFn: () => multiQueryFn(course),
      staleTime: Infinity,
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const data: TTeeTime[] = isLoading
    ? []
    : results
        .map((result) => result.data)
        .flat()
        .sort((a, b) => a.time.localeCompare(b.time));
  const filteredData =
    filters.length > 0
      ? data.filter((teeTime) => filters.includes(`${teeTime.booking_class}`))
      : data;

  return { data: filteredData, isLoading };
}

/*
  const pebbleUrl =
    "https://phx-api-be-east-1b.kenna.io/v2/tee-times?date=2025-07-16&facilityIds=18302";

  const loginUrl =
    "https://foreupsoftware.com/index.php/api/booking/users/login";
*/
