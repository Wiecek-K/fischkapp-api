import { Request, Response } from "express"

import Flascard from "../models/flashcardModel"
import asyncHandler from "express-async-handler"

//GET /flashcard
export const getFlashcards = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcards = await Flascard.find().sort({ createdAt: -1 })
    res.status(200).json(flashcards)
  }
)


//GET /flashcard/author/:author
export const getFlashcardsByAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    const author = req.params.author
    const flashcards = await Flascard.find({ author }).sort({
      createdAt: -1,
    })

    res.status(200).json(flashcards)
  }
)

//GET /flashcards/tags/:tag  Get all the records by specific tag
export const getFlashcardsByTag = asyncHandler(
  async (req: Request, res: Response) => {
    const tag = req.params.tag
    const flashcards = await Flascard.find({ tags: { $in: [tag] } }).sort({
      createdAt: -1,
    })

    res.status(200).json(flashcards)
  }
)

//POST /flashcards
export const createFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.front || !req.body.back) {
      res
        .status(400)
        .send("To add a card, you need the texts on the front and back sides")
      return
    }
    const isExisting = await Flascard.findOne({ front: req.body.front })

    if (isExisting) {
      res
        .status(400)
        .send("You can't duplicate flaschcards, please change the front text")
      return
    }
    const flashcard = await Flascard.create({
      front: req.body.front,
      back: req.body.back,
      tags: req.body?.tags,
      author: req.body?.author,
    })

    res.status(200).json(flashcard)
  }
)

//PATCH /flashcards/:id
export const updateFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcard = await Flascard.findById(req.params.id)

    if (!flashcard) {
      res.status(404).send("Flascard not found")
      return
    }
    try {
      const updateFlashcard = await Flascard.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      res.status(200).json(updateFlashcard)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
)

//DELETE /flashcards/:id
export const deleteFlashcard = asyncHandler(
  async (req: Request, res: Response) => {
    const flashcard = await Flascard.findById(req.params.id)

    if (!flashcard) {
      res.status(404).send("Flascard not found")
      return
    }

    const currentTime = new Date()
    if (5 * 60 * 1000 + flashcard.createdAt.getTime() < currentTime.getTime()) {
      res
        .status(403)
        .send(
          "You cannot delete a card that has been created for more than 5 minutes."
        )
      return
    }

    const deleteFlashcard = await Flascard.findByIdAndRemove(req.params.id)
    res.status(200).json(deleteFlashcard)
  }
)
