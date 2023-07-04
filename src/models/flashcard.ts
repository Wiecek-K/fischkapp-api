import mongoose from "mongoose"

// 1. Create an interface representing a document in MongoDB
interface IFlashCard {
  front: string
  back: string
}

// 2. Create a Schema corresponding to the document interface.
const Flashcard = new mongoose.Schema<IFlashCard>(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
  },
  { timestamps: true }
)

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);

// run().catch(err => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://127.0.0.1:27017/test');

//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

//   console.log(user.email); // 'bill@initech.com'
// }

export default mongoose.model("Flashcard", Flashcard)
