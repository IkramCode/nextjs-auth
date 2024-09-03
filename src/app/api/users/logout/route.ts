import { connection } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connection();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
