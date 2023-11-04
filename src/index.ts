import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
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

export const app = express()

const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express FischkappAPI with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ajmag",
        url: "https://github.com/Wiecek-K/",
        email: "aimag42@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["src/routes/*"],
}

const specs = swaggerJSDoc(swaggerOptions)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

const corsOptions = {
  origin: domain,
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
