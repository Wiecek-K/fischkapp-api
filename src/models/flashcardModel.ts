import mongoose from "mongoose"

export interface IFlashcard {
  _id: string
  front: string
  back: string
  author?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export const flashcardSchema = new mongoose.Schema<IFlashcard>(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "Unplauz",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Flashcard", flashcardSchema)
