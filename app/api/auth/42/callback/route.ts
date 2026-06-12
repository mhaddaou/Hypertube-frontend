import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function GET(req: NextRequest) {
  const backendUrl = new URL("/api/auth/42/callback", API_URL);
  backendUrl.search = req.nextUrl.search;
  return NextResponse.redirect(backendUrl);
}
