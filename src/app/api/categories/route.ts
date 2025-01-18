import { NextResponse } from "next/server";
import categoriesData from '@/data/categories.json'; 

export function GET() {
  return NextResponse.json({ success: true, data: categoriesData });
}
