import { Request, Response } from "express"

import Flascard from "../models/flashcardModel"
import asyncHandler from "express-async-handler"

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
    })

    res.status(200).json(flashcard)
  }
)
