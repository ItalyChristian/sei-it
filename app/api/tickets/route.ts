import { tickedMockDb } from "@/mocks/db/ticket.mock-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(tickedMockDb.list());
}
