import mongoose from "mongoose"

interface IFlashcard {
  front: string
  back: string
  author?: string
  tags?: string
}

export const flashcardSchema = new mongoose.Schema<IFlashcard>(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    tags: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Flashcard", flashcardSchema)
