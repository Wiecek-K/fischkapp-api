import express from "express"
import dotenv from "dotenv"
import flashcardRouter from "./routes/flashcards"
import { errorHandler } from "./middlewares/errors"
dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/flashcards", flashcardRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})
