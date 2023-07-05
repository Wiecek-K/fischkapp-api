import mongoose from "mongoose"
import { arrayBuffer } from "stream/consumers"

interface IFlashcard {
  front: string
  back: string
  author?: string
  tags?: string[]
}

export const flashcardSchema = new mongoose.Schema<IFlashcard>(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    tags: {
      type: [String],
    },
    author: {
      type: String,
      default: "Unplauz",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Flashcard", flashcardSchema)
