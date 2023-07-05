import { Request, Response } from "express"

import Flascard from "../models/flashcardModel"
import asyncHandler from "express-async-handler"

//GET /flashcard
export const getFlashcards = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcards = await Flascard.find()
    res.status(200).json(flashcards)
  }
)

//POST /flashcards
export const createFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.front || !req.body.back) {
      res.status(400)
      throw new Error(
        "To add a card, you need the texts on the front and back sides"
      )
    }
    const flashcard = await Flascard.create({
      front: req.body.front,
      back: req.body.back,
    })

    res.status(200).json(flashcard)
  }
)

//PATCH /flashcards/:id
export const updateFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcard = await Flascard.findById(req.params.id)

    if (!flashcard) {
      res.status(400)
      throw new Error("Flascard not found")
    }

    const updateFlashcard = await Flascard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updateFlashcard)
  }
)

//DELETE /flashcards/:id
export const deleteFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcard = await Flascard.findById(req.params.id)

    if (!flashcard) {
      res.status(400)
      throw new Error("Flascard not found")
    }
    const deleteFlashcard = await Flascard.findByIdAndRemove(req.params.id)

    res.status(200).json(deleteFlashcard)
  }
)
