import { Request, Response, NextFunction } from "express"

function checkAuthorization(req: Request, res: Response, next: NextFunction) {
  const headerAuth = req.header("Authorization")
  if (headerAuth && headerAuth === "pss-this-is-my-secret") {
    next()
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default checkAuthorization
