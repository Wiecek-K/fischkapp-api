import mongoose from "mongoose"

interface IFlashcard {
  front: string
  back: string
}

export const flashcardSchema = new mongoose.Schema<IFlashcard>(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("Flashcard", flashcardSchema)
