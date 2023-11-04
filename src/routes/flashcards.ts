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

/**
 * @swagger
 * components:
 *   schemas:
 *     Flashcard:
 *       type: object
 *       required:
 *         - front
 *         - back
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the flashcard
 *         front:
 *           type: string
 *           description: The flashcard front text
 *         back:
 *           type: string
 *           description: The flashcard back text
 *         tags:
 *           type: array
 *           items:
 *              type: string
 *           description: The flashcard tags
 *         author:
 *           type: string
 *           description: The flashcard author
 *         createdAt:
 *           type: string
 *           description: The flashcard create date
 *         updatedAt:
 *           type: string
 *           descripe: The flashcard last update date
 *       example:
 *         id: 64a4d3c0b7008656790ecc8b
 *         front: Test Flashcard 1
 *         back: Number One
 *         tags: ["example", "test"]
 *         author: Ajmag
 *         createdAt: 2023-07-05T02:21:52.650Z
 *         updatedAt: "2023-07-05T02:21:55.220Z"
 */

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
