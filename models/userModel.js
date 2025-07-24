import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email alrady exists"],
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});

// Create a Mongoose Model from the Schema
const User = mongoose.model("User", userSchema);

export default User;
