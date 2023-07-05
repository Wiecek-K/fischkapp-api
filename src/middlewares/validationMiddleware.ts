import { Request, Response, NextFunction } from "express"
import Joi, { Schema } from "joi"

const schema: Schema = Joi.object({
  front: Joi.string().required(),
  back: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  author: Joi.string(),
})

function validationMiddleware(req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

export default validationMiddleware
