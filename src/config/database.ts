import { MongoClient, Db } from "mongodb"
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

// export const uri = process.env.MONGODB_URI
// const dbName = "Fischkapp-API"

// export async function connectDatabase(): Promise<Db> {
//   const client = await MongoClient.connect(uri)
//   const db = client.db(dbName)
//   return db
// }
