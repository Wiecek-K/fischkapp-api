import { Router } from "express"
import validationMiddleware from "../middlewares/validationMiddleware"
import {
  createFlashcard,
  updateFlashcard,
  getFlashcards,
  getFlashcardsByAuthor,
} from "../controllers/flashcardsController"
const router = Router()

//GET & POST  /flashcard
router.route("/").get(getFlashcards).post(validationMiddleware, createFlashcard)

//GET /flashcard/author/:author
router.route("/author/:author").get(validationMiddleware, getFlashcardsByAuthor)

//PATCH /flashcards/:id
router.route("/:id").patch(validationMiddleware, updateFlashcard)

export default router
