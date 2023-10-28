import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import flashcardModel from "../models/flashcardModel"

const mongod = MongoMemoryServer.create()

export const initialCardsMock = [
  {
    _id: "64a4d3c0b7008656790ecc8b",
    front: "Test Flashcard 1",
    back: "Number One",
    tags: ["abc", "dog"],
    author: "Author1",
    createdAt: "2023-07-05T02:21:52.650Z",
    updatedAt: "2023-07-05T02:21:52.650Z",
    __v: 0,
  },
  {
    _id: "64a6e5150fbe392a34e00a18",
    front: "Test Flashcard 2",
    back: "Number Two",
    tags: ["abc", "cat", "sky"],
    author: "Author1",
    createdAt: "2023-07-06T16:00:21.191Z",
    updatedAt: "2023-07-06T16:00:21.191Z",
    __v: 0,
  },
  {
    _id: "64a6e51a0fbe392a34e00a1b",
    front: "Test Flashcard 3",
    back: "Number Three",
    tags: ["dog"],
    author: "Author3",
    createdAt: "2023-07-06T16:00:26.859Z",
    updatedAt: "2023-07-06T16:00:26.859Z",
    __v: 0,
  },
]

async function connectDatabase() {
  const mongoUri = await (await mongod).getUri()
  await mongoose.connect(mongoUri)
}

async function disconnectDatabase() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await (await mongod).stop()
}

beforeAll(async () => {
  await connectDatabase()
})

afterAll(async () => {
  await disconnectDatabase()
})

beforeEach(async () => {
  await mongoose.connection.dropDatabase()

  flashcardModel.insertMany(initialCardsMock)
})
