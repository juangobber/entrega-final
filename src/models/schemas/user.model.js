import mongoose from "mongoose"
const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  cart: {type: mongoose.Schema.Types.ObjectId, ref:"carts"},
  password: { type: String },
  githubLogin: {type: String, unique: true},
  role: { type: String },
  lastLogin : {type: Date, default: Date.now}
});

const UserModel = mongoose.model(userCollection, userSchema);


export default UserModel
