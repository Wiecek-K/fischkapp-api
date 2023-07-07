import { Router } from "express"
import validationMiddleware from "../middlewares/validationMiddleware"
import {
  createFlashcard,
  updateFlashcard,
  getFlashcards,
  getFlashcardsByAuthor,
  getFlashcardsByTag,
  deleteFlashcard,
} from "../controllers/flashcardsController"
const router = Router()

//GET & POST  /flashcards
router.route("/").get(getFlashcards).post(validationMiddleware, createFlashcard)

//GET /flashcards/author/:author
router.route("/author/:author").get(getFlashcardsByAuthor)

//GET /flashcards/tags/:tag  Get all the records by specific tag
router.route("/tags/:tag").get(getFlashcardsByTag)

//PATCH & DELETE /flashcards/:id
router
  .route("/:id")
  .patch(validationMiddleware, updateFlashcard)
  .delete(deleteFlashcard)

export default router
