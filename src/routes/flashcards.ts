/* eslint-disable node/no-missing-import */
import { Router, Request, Response } from "express"
// import { catchAsync } from "../middlewares/errors"
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardsController"
const router = Router()

//GET & POST  /flashcard
router.route("/").get(getFlashcards).post(createFlashcard)

//PATCH & DELETE  /flashcards/:_id
router.route("/:_id").patch(updateFlashcard).delete(deleteFlashcard)

//GET /flashcard
// router.get("/:id", catchAsync(flashcardsController.findOne))

//GET /flashcards
// router.get("/", catchAsync(flashcardsController.findAll))

// //POST /flashcard
// router.post("/", catchAsync(flashcardsController.create))

// //PUT /flashcard/:id
// router.put("/", catchAsync(flashcardsController.update))

// //DELETE /flashcard/:id
// router.delete("/:id", catchAsync(flashcardsController.delete))

export default router
