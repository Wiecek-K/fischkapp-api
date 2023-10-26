import request from "supertest"
import { app } from "../index"

import { startingStateDB } from "../../test-setup"
const DEFAULT_ROUTE = "/api/v1/flashcards/"
const AUTHORIZATION_KEY = "pss-this-is-my-secret"

describe("flashcard", () => {
  describe("finding cards", () => {
    describe("get all cards route", () => {
      it("Function returns correct number of flashcards, in the correct order, whit status 200", async () => {
        console.log(5)

        const response = await request(app)
          .get(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBe(startingStateDB.length)
      })
    })
  })
})
