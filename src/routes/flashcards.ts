import { Router } from "express"

import { createFlashcard } from "../controllers/flashcardsController"
const router = Router()

//POST  /flashcard
router.route("/").post(createFlashcard)

export default router
