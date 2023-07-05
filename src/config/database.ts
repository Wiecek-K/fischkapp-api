import mongoose from "mongoose"
import "colors"
import dotenv from "dotenv"
dotenv.config()

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Mongo Connected: ${conn.connection.host}`.cyan)
  } catch (err) {
    throw new Error(err)
  }
}
