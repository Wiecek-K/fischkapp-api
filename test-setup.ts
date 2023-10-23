import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose, { Connection } from "mongoose"
import { flashcardSchema } from "./src/models/flashcardModel"

let mongoServer: MongoMemoryServer
let dbConnection: Connection

export const startingStateDB = [
  {
    _id: "64a4d3c0b7008656790ecc8b",
    front: "Test Flashcard 1",
    back: "Number One",
    tags: ["abc"],
    author: "Author1",
    createdAt: "2023-07-05T02:21:52.650Z",
    updatedAt: "2023-07-05T02:21:52.650Z",
    __v: 0,
  },
  {
    _id: "64a6e5150fbe392a34e00a18",
    front: "Test Flashcard 2",
    back: "Number Two",
    tags: ["abc"],
    author: "Author1",
    createdAt: "2023-07-06T16:00:21.191Z",
    updatedAt: "2023-07-06T16:00:21.191Z",
    __v: 0,
  },
  {
    _id: "64a6e51a0fbe392a34e00a1b",
    front: "Test Flashcard 3",
    back: "Number Three",
    tags: ["abc"],
    author: "Author3",
    createdAt: "2023-07-06T16:00:26.859Z",
    updatedAt: "2023-07-06T16:00:26.859Z",
    __v: 0,
  },
]

async function connectDatabase() {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  dbConnection = await mongoose.createConnection(mongoUri)
  console.log("mock DB")
}

async function disconnectDatabase() {
  await dbConnection.close()
  await mongoServer.stop()
}

beforeAll(async () => {
  await connectDatabase()
})

afterAll(async () => {
  await disconnectDatabase()
})

beforeEach(async () => {
  await dbConnection.dropDatabase()

  const TestData = dbConnection.model("TestData", flashcardSchema)
  await TestData.create(startingStateDB)
  console.log("reset DB", startingStateDB)
})
