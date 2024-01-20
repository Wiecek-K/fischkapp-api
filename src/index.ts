import express from "express"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
import cors from "cors"
import "colors"

import { swaggerConfig } from "../swaggerconfig"
import { swaggerUiOptions } from "../swaggerconfig"
import flashcardRouter from "./routes/flashcards"
import { errorHandler } from "./middlewares/errors"
import { connectDatabase } from "./config/database"
import checkAuthorization from "./middlewares/corsMiddlewares"

dotenv.config()
const port = process.env.PORT
const domains = process.env.DOMAINS.split(", ")
connectDatabase()

export const app = express()

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerConfig, {
    swaggerOptions: swaggerUiOptions,
  })
)

const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  origin: function (origin: string, callback: Function) {
    if (domains.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning",
  ],
}

app.options("*", cors()) // enable pre-flight request
app.use(checkAuthorization)
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/flashcards", flashcardRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})
