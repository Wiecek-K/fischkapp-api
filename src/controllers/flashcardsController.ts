import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

import Flascard from "../models/flashcard"

export default {
  async findOne(req: Request, res: Response, next: NextFunction) {
    const flashcard = await Flascard.findOne({ _id: req.params._id })
    if (!flashcard) return next()
    return res.status(200).send({ data: flashcard })
  },

  async findAll(req: Request, res: Response) {
    const flashcards = await Flascard.find().sort({ createdAt: "desc" })
    return res.status(200).send({ data: flashcards })
  },

  async create(req: Request, res: Response) {
    const flashcard = await new Flascard({
      front: req.body.front,
      back: req.body.back,
    }).save()
    return res
      .status(201)
      .send({ data: flashcard, message: "Flashcard was created." })
  },

  // async update(req: Request, res: Response, next: NextFunction) {},

  // async delete(req: Request, res: Response, next: NextFunction) {},
}
