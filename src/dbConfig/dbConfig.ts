import mongoose from "mongoose";

export async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully");

      connection.on("error", (error) => {
        console.log(
          "Mongodb connection error , make sure MongoDB is running",
          error
        );

        process.exit(1);
      });
    });
  } catch (error) {
    console.log("something went wrong with database connection", error);
  }
}
