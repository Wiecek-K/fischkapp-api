import mongoose from "mongoose"
import "colors"
import dotenv from "dotenv"
dotenv.config()

const NODE_ENV = process.env.NODE_ENV

export const connectDatabase = async () => {
  try {
    if (NODE_ENV !== "test") {
      const conn = await mongoose.connect(process.env.MONGODB_URI)
      console.log(`Mongo Connected: ${conn.connection.host}`.cyan)
    }
  } catch (err) {
    throw new Error(err)
  }
}
