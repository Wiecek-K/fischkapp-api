import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("404 page not found")
  //   err.status = 404
  next(err)
}

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err))
  }
}

export const catchErrors: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
  })
}
