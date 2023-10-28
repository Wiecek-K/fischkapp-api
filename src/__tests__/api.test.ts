import request from "supertest"
import { app } from "../index"
import { IFlashcard } from "../models/flashcardModel"
import { initialCardsMock } from "./test-setup"
const DEFAULT_ROUTE = "/api/v1/flashcards/"
const AUTHORIZATION_KEY = "pss-this-is-my-secret"

const newCardMock = {
  front: "New Flashcard",
  back: "Number Zero",
  tags: ["new", "card"],
  author: "New Author",
}

describe("flashcard", () => {
  describe("finding cards", () => {
    describe("get all cards route", () => {
      it("Function returns correct number of flashcards, in the correct order, with status 200", async () => {
        const response = await request(app)
          .get(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(initialCardsMock.length)

        const isSorted = data.every((flashcard, index, array) => {
          if (index === 0) return true
          return (
            Date.parse(flashcard.createdAt + "") <=
            Date.parse(array[index - 1].createdAt + "")
          )
        })
        expect(isSorted).toBe(true)
      })
    })
    describe("get cards by author route", () => {
      it("Function returns correct number of flashcards written by the requested author, in the correct order, with status 200", async () => {
        const initialCardsMockFilteredByAuthor = initialCardsMock.filter(
          (flaschcards) => flaschcards.author === "Author1"
        )

        const response = await request(app)
          .get(DEFAULT_ROUTE + "author/Author1")
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(initialCardsMockFilteredByAuthor.length)

        const isSorted = data.every((flashcard, index, array) => {
          if (index === 0) return true
          return (
            Date.parse(flashcard.createdAt + "") <=
            Date.parse(array[index - 1].createdAt + "")
          )
        })
        expect(isSorted).toBe(true)
      })
    })
    describe("get cards by tag route", () => {
      it("Function returns correct number of flashcards with the requested tag, in the correct order, with status 200", async () => {
        const initialCardsMockFilteredByTag = initialCardsMock.filter(
          (flaschcards) => flaschcards.tags.includes("dog")
        )

        const response = await request(app)
          .get(DEFAULT_ROUTE + "tags/dog")
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(initialCardsMockFilteredByTag.length)

        const isSorted = data.every((flashcard, index, array) => {
          if (index === 0) return true
          return (
            Date.parse(flashcard.createdAt + "") <=
            Date.parse(array[index - 1].createdAt + "")
          )
        })
        expect(isSorted).toBe(true)
      })
    })
  })
  describe("creating card", () => {
    describe("post card route", () => {
      it("Function returns a status code of 201 and creates a new flashcard with the correct fields", async () => {
        let response

        response = await request(app)
          .post(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)
          .send(newCardMock)
        expect(response.status).toBe(201)

        response = await request(app)
          .get(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body
        expect(response.status).toBe(200)
        console.log(data)

        const newCard = data.find(
          (flashcard) => flashcard.front === newCardMock.front
        )
        expect(newCard).toBeTruthy()
        expect(newCard.back).toBe(newCardMock.back)
        expect(newCard.author).toBe(newCardMock.author)
        expect(
          newCardMock.tags.every((tag) => newCard.tags.includes(tag))
        ).toBe(true)
      })
      it("function returns a status code of 400 when card with specific front value already exists", async () => {
        const response = await request(app)
          .post(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)
          .send({ ...newCardMock, front: initialCardsMock[0].front })
        expect(response.status).toBe(400)
      })
    })
  })
})
