import { MongoClient, Db } from "mongodb"

import dotenv from "dotenv"
dotenv.config()

export const uri = process.env.MONGODB_URI
const dbName = "Fischkapp-API"

export async function connectDatabase(): Promise<Db> {
  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)
  return db
}
