import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()

  mongoose.connect(mongoUri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

beforeEach(async () => {
  // Wyczyść kolekcje lub wykonaj inne operacje przygotowawcze przed każdym testem
})
