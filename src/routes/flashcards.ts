import { Router } from "express"
import validationMiddleware from "../middlewares/validationMiddleware"
import {
  createFlashcard,
  updateFlashcard,
  getFlashcards,
} from "../controllers/flashcardsController"
const router = Router()

//GET & POST  /flashcard
router.route("/").get(getFlashcards).post(createFlashcard)

//PATCH /flashcards/:id
router.route("/:id").patch(validationMiddleware, updateFlashcard)

export default router
