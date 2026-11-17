import { userMockDb } from "@/mocks/db/user.mock-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(userMockDb.list());
}
