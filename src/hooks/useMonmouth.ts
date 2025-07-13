import { useQuery } from "@tanstack/react-query";
import useDateParam from "@/hooks/useDateParam";

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
  green_fee: number;
  id: string;
  time: string;
};

export default function useMonmouth() {
  const [date] = useDateParam();
  const url = `/api/foreup?date=${date}`;

  const queryFn = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const updatedData = data.map((teeTime: TAPITeeTime) => {
      return {
        available_spots: teeTime.available_spots,
        course_id: teeTime.course_id,
        course_name: teeTime.course_name,
        green_fee: teeTime.green_fee,
        id: `${teeTime.course_id}-${teeTime.time}`,
        time: teeTime.time,
      };
    });
    return updatedData;
  };

  const { data, isLoading } = useQuery<TTeeTime[]>({
    queryKey: ["monmouth", date],
    queryFn,
    staleTime: Infinity,
  });

  return { data, isLoading };
}

/*
  const pebbleUrl =
    "https://phx-api-be-east-1b.kenna.io/v2/tee-times?date=2025-07-16&facilityIds=18302";

  const loginUrl =
    "https://foreupsoftware.com/index.php/api/booking/users/login";
*/
