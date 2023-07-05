import { Router } from "express"

import {
  createFlashcard,
  updateFlashcard,
} from "../controllers/flashcardsController"
const router = Router()

//POST  /flashcard
router.route("/").post(createFlashcard)

//PATCH /flashcards/:id
router.route("/:id").patch(updateFlashcard)


export default router
