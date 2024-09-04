import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connection();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    } else {
      return NextResponse.json({
        message: "User found",
        user: user,
        success: true,
        status: 200,
       });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
