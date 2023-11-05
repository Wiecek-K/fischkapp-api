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
 *         _id: 64a4d3c0b7008656790ecc8b
 *         front: Test Flashcard 1
 *         back: Number One
 *         tags: ["example", "test"]
 *         author: Ajmag
 *         createdAt: 2023-07-05T02:21:52.650Z
 *         updatedAt: 2023-07-05T02:21:55.220Z
 *     NewFlashcard:
 *       type: object
 *       required:
 *         - front
 *         - back
 *       properties:
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
 *       example:
 *         front: Test Flashcard 1
 *         back: Number One
 *         tags: ["example", "test"]
 *         author: Ajmag
 *   responses:
 *      UnauthorizedError:
 *        description: API key is missing or invalid
 *        headers:
 *          WWW_Authenticate:
 *            schema:
 *              type: string
 *
 */
/**
 * @swagger
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Authentication information is missing or invalid
 *      headers:
 *        WWW_Authenticate:
 *          schema:
 *           type: string
 */
/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: The flashcards managing API
 */

//GET   /flashcards
router.route("/").get(getFlashcards)
/**
 * @swagger
 * /api/v1/flashcards:
 *   get:
 *     summary: Returns the list of all the flashcards
 *     tags: [Flashcards]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         example: "Bearer pss-this-is-my-secret"
 *     responses:
 *       200:
 *         description: The list of the flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 */

//POST  /flashcards
router.route("/").post(validationMiddleware, createFlashcard)
/**
 * @swagger
 * /api/v1//flashcards:
 *   post:
 *     summary: Create a new flashcard
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFlashcard'
 *     responses:
 *       200:
 *         description: The flashcard was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Some error, you need the texts on the front and back sides and can't duplicate flaschcards
 */

//GET /flashcards/author/:author
router.route("/author/:author").get(getFlashcardsByAuthor)
/**
 * @swagger
 * /api/v1//flashcards/author/{author}:
 *   get:
 *     summary: Get the flashcards by author
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: author
 *         schema:
 *           type: string
 *         required: true
 *         description: The flashcards author
 *     responses:
 *       200:
 *         description: The array of flashcard description by author
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 */

//GET /flashcards/tags/:tag  Get all the records by specific tag
router.route("/tags/:tag").get(getFlashcardsByTag)
/**
 * @swagger
 * /api/v1//flashcards/tags/{tag}:
 *   get:
 *     summary: Get the flashcards by tag
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: The flashcards tag
 *     responses:
 *       200:
 *         description: The array of flashcard description by tag
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 */

//DELETE /flashcards/:id
router.route("/:id").delete(deleteFlashcard)
/**
 * @swagger
 * /api/v1//flashcards/{_id}:
 *   delete:
 *     summary: Remove the flashcard by id
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flashcard id
 *
 *     responses:
 *       204:
 *         description: The flashcard was deleted
 *       403:
 *         description: You cannot delete a card that has been created for more than 5 minutes.
 *       404:
 *         description: The flashcard not found
 */

//PATCH /flashcards/:id
router.route("/:id").patch(validationMiddleware, updateFlashcard)
/**
 * @swagger
 * /api/v1//flashcards/{_id}:
 *   patch:
 *     summary: Edit the flashcard by id
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flashcard id
 *       - in: request
 *         name: front
 *         schema:
 *           type: string
 *         description: The new flashcard front text
 *       - in: request
 *         name: back
 *         schema:
 *           type: string
 *         description: The new flashcard back text
 *
 *     responses:
 *       204:
 *         description: The flashcard was updated
 *
 *       404:
 *         description: The flashcard not found
 *       500:
 *         description: Some error
 */

export default router
