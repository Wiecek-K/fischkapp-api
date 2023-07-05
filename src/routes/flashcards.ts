import { Router } from "express"

import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardsController"
const router = Router()

//GET & POST  /flashcard
router.route("/").get(getFlashcards).post(createFlashcard)

//PATCH & DELETE  /flashcards/:id
router.route("/:id").patch(updateFlashcard).delete(deleteFlashcard)

export default router
