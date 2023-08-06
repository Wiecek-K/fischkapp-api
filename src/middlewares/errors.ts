import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("404 page not found")
  next(err)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}
