import { Schema, model, models } from 'mongoose';

// Define the User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email alrady exists"],
  },
   username: {
    type: String,
    required: true,
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
},{
  timestamps:true
});

// Create a Mongoose Model from the Schema
const User = models.User || model('User', userSchema);

export default User;
