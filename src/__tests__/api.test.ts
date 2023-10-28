import request from "supertest"
import { app } from "../index"
import { IFlashcard } from "../models/flashcardModel"
import { initialCardsMock } from "./test-setup"
const DEFAULT_ROUTE = "/api/v1/flashcards/"
const AUTHORIZATION_KEY = "pss-this-is-my-secret"

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
        const startingStateFilteredByAuthor = initialCardsMock.filter(
          (flaschcards) => flaschcards.author === "Author1"
        )

        const response = await request(app)
          .get(DEFAULT_ROUTE + "author/Author1")
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(startingStateFilteredByAuthor.length)

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
        const startingStateFilteredByTag = initialCardsMock.filter(
          (flaschcards) => flaschcards.tags.includes("dog")
        )

        const response = await request(app)
          .get(DEFAULT_ROUTE + "tags/dog")
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(startingStateFilteredByTag.length)

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
})
