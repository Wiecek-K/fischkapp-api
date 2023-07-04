import express from "express"
import dotenv from "dotenv"
dotenv.config()

import { Request, Response } from "express"
import flashcardRouter from "./routes/flashcards"

const port = process.env.PORT || 5000

const app = express()

app.use("/api/v1", flashcardRouter)

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})
