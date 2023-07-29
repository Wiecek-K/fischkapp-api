import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "colors"

import flashcardRouter from "./routes/flashcards"
import { errorHandler } from "./middlewares/errors"
import { connectDatabase } from "./config/database"
import checkAuthorization from "./middlewares/corsMiddlewares"

dotenv.config()
const port = process.env.PORT
const domain = process.env.DOMAIN
connectDatabase()

const app = express()

// Ustawienie CORS z wykorzystaniem zmiennej dozwolonaDomena
const corsOptions = {
  origin: domain,
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(checkAuthorization)
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/flashcards", flashcardRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})
