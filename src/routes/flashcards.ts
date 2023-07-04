/* eslint-disable node/no-missing-import */
import { Router, Request, Response } from "express"
import flashcardsController from "../controllers/flashcardsController"
import { catchAsync } from "../middlewares/errors"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get goals" })
})

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Set goals" })
})

router.patch("/:_id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Patch goal ${req.params._id}` })
})

router.delete("/:_id", (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete goal ${req.params._id}` })
})
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
