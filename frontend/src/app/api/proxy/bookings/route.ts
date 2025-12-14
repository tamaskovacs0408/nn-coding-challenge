import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_KEY = process.env.API_KEY || "";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const barberId = url.searchParams.get("barberId");
    const date = url.searchParams.get("date");

    if (!barberId) {
      return NextResponse.json(
        { message: "Missing barberId" },
        { status: 400 }
      );
    }

    const upstreamUrl = `${BASE_URL}/api/booking?barberId=${encodeURIComponent(
      barberId
    )}${date ? `&date=${encodeURIComponent(date)}` : ""}`;

    const upstreamRes = await fetch(upstreamUrl, {
      headers: {
        "x-api-key": API_KEY,
      },
      cache: "no-store",
    });

    const text = await upstreamRes.text();
    const contentType = upstreamRes.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = text ? JSON.parse(text) : null;
      return NextResponse.json(json, { status: upstreamRes.status });
    }

    return new NextResponse(text, {
      status: upstreamRes.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: message || "Upstream error" },
      { status: 502 }
    );
  }
}
