import { categoryMockDb } from "@/mocks/db/category.mock-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(categoryMockDb.list());
}
