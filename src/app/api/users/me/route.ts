import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connection();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!userId) {
      console.error("Error: Invalid token or user ID not found.");
      return NextResponse.json({
        error: "Invalid token or user ID not found.",
      });
    }

    if (!user) {
      console.error("Error: User not found");
      return NextResponse.json({
        error: "User not found",
      });
    }

    console.log("user", user);

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message });
  }
}
