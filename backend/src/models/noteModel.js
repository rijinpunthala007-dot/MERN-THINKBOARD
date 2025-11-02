import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // A note must belong to a user
      ref: 'User', // References the 'User' model
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;