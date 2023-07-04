import express from "express"
import dotenv from "dotenv"
dotenv.config()

import flashcardRouter from "./routes/flashcards"

const port = process.env.PORT || 5000

const app = express()

app.use("/api/v1/flashcards", flashcardRouter)

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})
