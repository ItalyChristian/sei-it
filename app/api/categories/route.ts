import { categoryMockDb } from "@/entities/ticket/category/category.mock-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(categoryMockDb.list());
}
