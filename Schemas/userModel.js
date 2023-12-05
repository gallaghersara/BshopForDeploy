//schemas
import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose"
const UserSchema = new mongoose.Schema({
  userID: {
    type: Date,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // isCompleted: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   dateCreated: {
  //     type: Date,
  //     default: Date.now(),
  //   },
});

// UserSchema.plugin(passportLocalMongoose)
const User = mongoose.model("users", UserSchema);

export default User;
