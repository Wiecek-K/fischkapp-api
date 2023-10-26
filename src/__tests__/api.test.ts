import request from "supertest"
import { app } from "../index"
import { IFlashcard } from "../models/flashcardModel"
import { startingStateDB } from "../../test-setup"
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
        expect(data.length).toBe(startingStateDB.length)

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
