import request from "supertest"
import { app } from "../index"

import flashcardModel from "../models/flashcardModel"
import { IFlashcard } from "../models/flashcardModel"
import { initialCardsMock } from "./test-setup"
import { ObjectId } from "mongodb"

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
  describe("editing card", () => {
    describe("patch card route", () => {
      it("Function updates the requested flashcard with the correct fields and returns the updated flashcard whit a status code of 200", async () => {
        let response

        response = await request(app)
          .patch(DEFAULT_ROUTE + initialCardsMock[0]._id)
          .set("Authorization", AUTHORIZATION_KEY)
          .send(newCardMock)

        expect(response.status).toBe(200)
        expect(response.body.front).toBe(newCardMock.front)
        expect(response.body.back).toBe(newCardMock.back)

        response = await request(app)
          .get(DEFAULT_ROUTE)
          .set("Authorization", AUTHORIZATION_KEY)
        const data: IFlashcard[] = response.body

        expect(response.status).toBe(200)

        const editedCard = data.find(
          (flashcard) => flashcard._id === initialCardsMock[0]._id
        )

        expect(editedCard).toBeTruthy()
        expect(editedCard.front).toBe(newCardMock.front)
        expect(editedCard.back).toBe(newCardMock.back)
        expect(editedCard.author).toBe(newCardMock.author)
        expect(
          newCardMock.tags.every((tag) => editedCard.tags.includes(tag))
        ).toBe(true)
      })
    })
  })
  describe("deleting card", () => {
    describe("delete card route", () => {
      it("function deletes the requested flashcard if it was created less than 5 minutes ago and returns a status code of 204", async () => {
        const idCardToDelete = new ObjectId(Date.now() - 5000).toString()
        flashcardModel.create({
          ...newCardMock,
          createdAt: Date.now() - 5000,
          _id: idCardToDelete,
        })

        const response = await request(app)
          .delete(DEFAULT_ROUTE + idCardToDelete)
          .set("Authorization", AUTHORIZATION_KEY)
        expect(response.status).toBe(204)
      })

      it("function returns a status code of 403 if the flashcard was created more than 5 minutes ago", async () => {
        const idCardToDelete = new ObjectId(
          Date.now() - (1000 * 60 * 5 + 1)
        ).toString()
        flashcardModel.create({
          ...newCardMock,
          createdAt: Date.now() - (1000 * 60 * 5 + 1),
          _id: idCardToDelete,
        })

        const response = await request(app)
          .delete(DEFAULT_ROUTE + idCardToDelete)
          .set("Authorization", AUTHORIZATION_KEY)
        expect(response.status).toBe(403)
      })

      it("function returns a status code of 404 if the requested flashcard does not exist", async () => {
        const idNonExistingCard = new ObjectId().toString()

        const response = await request(app)
          .delete(DEFAULT_ROUTE + idNonExistingCard)
          .set("Authorization", AUTHORIZATION_KEY)
        expect(response.status).toBe(404)
      })
    })
  })
})
