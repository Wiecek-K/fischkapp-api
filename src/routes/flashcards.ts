import { Router } from "express"
import validationMiddleware from "../middlewares/validationMiddleware"
import {
  createFlashcard,
  updateFlashcard,
} from "../controllers/flashcardsController"
const router = Router()

//POST  /flashcard
router.route("/").post(createFlashcard)

//PATCH /flashcards/:id
router.route("/:id").patch(validationMiddleware, updateFlashcard)

export default router
