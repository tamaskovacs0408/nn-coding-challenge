import { apiFetch } from "@/lib/api/fetch";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const barberId = searchParams.get("barberId");
    const date = searchParams.get("date");

    if (!barberId) {
      return Response.json({ message: "Missing barberId" }, { status: 400 });
    }

    if (!date) {
      return Response.json({ message: "Missing date" }, { status: 400 });
    }

    const year = date.slice(0, 4);

    const slotsResponse = await apiFetch(
      `/api/booking?barberId=${encodeURIComponent(barberId)}${
        date ? `&date=${encodeURIComponent(date)}` : ""
      }`
    );

    const holidaysResponse = await apiFetch(
      `/api/public-holidays?year=${encodeURIComponent(year)}`,
      { cache: "force-cache" }
    );

    const [slots, holidays] = await Promise.all([
      slotsResponse,
      holidaysResponse
    ]);

    console.log("slots", slots);
    console.log("holidays", holidays);

    const isHoliday = holidays.some((holiday: { date: string}) => holiday.date === date);

    return Response.json({
      isHoliday,
      slots
    })
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknow error happened";
    return Response.json(
      { message: errorMessage},
      { status: 502 }
    )
  }
}
