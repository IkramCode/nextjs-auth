import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("Retrieved token:", token);

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken._id) {
      throw new Error("User ID not found in token");
    }

    return decodedToken._id;
  } catch (error: any) {
    console.error("Error decoding token:", error.message);
    throw new Error(error.message);
  }
};
