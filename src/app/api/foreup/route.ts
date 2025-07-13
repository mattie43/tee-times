import { NextRequest, NextResponse } from "next/server";

const convertDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year}`;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date") || "";
  const booking_class = searchParams.get("booking_class") || "";
  const schedule_id = searchParams.get("schedule_id") || "";

  const url = `
  https://foreupsoftware.com/index.php/api/booking/times
  ?time=all
  &date=${convertDate(date)}
  &holes=all
  &players=0
  &booking_class=${booking_class}
  &schedule_id=${schedule_id}
  &specials_only=0
  &api_key=no_limits`
    .trim()
    .replace(/\s+/g, "");

  const upstream = await fetch(url, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { message: `Upstream error ${upstream.status}` },
      { status: upstream.status }
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
