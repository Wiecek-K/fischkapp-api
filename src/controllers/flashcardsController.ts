import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

import Flascard from "../models/flashcard"

//GET /flashcard
export const getFlashcards = (req: Request, res: Response) => {
  res.status(200).json({ message: "Get goals" })
}

//POST /flashcards
export const createFlashcard = (req: Request, res: Response) => {
  res.status(200).json({ message: "Set goals" })
}

//PATCH /flashcards/:_id
export const updateFlashcard = (req: Request, res: Response) => {
  res.status(200).json({ message: `Patch goal ${req.params._id}` })
}

//DELETE /flashcards/:_id
export const deleteFlashcard = (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete goal ${req.params._id}` })
}

// async findOne(req: Request, res: Response, next: NextFunction) {
//   const flashcard = await Flascard.findOne({ _id: req.params._id })
//   if (!flashcard) return next()
//   return res.status(200).send({ data: flashcard })
// },

// async findAll(req: Request, res: Response) {
//   const flashcards = await Flascard.find().sort({ createdAt: "desc" })
//   return res.status(200).send({ data: flashcards })
// },

// async create(req: Request, res: Response) {
//   const flashcard = await new Flascard({
//     front: req.body.front,
//     back: req.body.back,
//   }).save()
//   return res
//     .status(201)
//     .send({ data: flashcard, message: "Flashcard was created." })
// },

// async update(req: Request, res: Response, next: NextFunction) {},

// async delete(req: Request, res: Response, next: NextFunction) {},
