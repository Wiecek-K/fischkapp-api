import { Request, Response } from "express"
import express from "express"
import { connectDatabase } from "./config/database"
import bodyParser from "body-parser"
import { join } from "path"
import { notFound, catchErrors } from "./middlewares/errors"

// const card1 = { front: "kwas", back: "cytrynowy" }
// const card2 = {
//   question: "What is the capital of France?",
//   answer: "Paris",
// }
// const card3 = { front: "SH2SO4", back: "Wystarczy kropla" }
// Connect to database

import mongoose from "mongoose"
import { uri } from "./config/database"

mongoose.connect(uri)
mongoose.Promise = global.Promise
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database. Exiting now...")
  throw new Error("Could not connect to the database. Exiting now...")
})

const app = express()
const port = 4000

// // Endpoints
// app.get("/", (req: Request, res: Response) => {
//   res.send("Witaj w moim API!")
// })

// // Start serwera
// app.listen(port, () => {
//   console.log(`Serwer nasłuchuje na porcie ${port}`)
// })
// ;(async () => {
//   const db = await connectDatabase()
//   try {
//     console.log(db)
//   } catch (err) {
//     console.error("Wystąpił błąd:", err)
//   }
// })()

app.set("view engine", "pug")
app.set("views", join(__dirname, "views"))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// errors handling
app.use(notFound)
app.use(catchErrors)

// let's play!
app.listen(port, () => {
  console.log("Server is up!")
})
