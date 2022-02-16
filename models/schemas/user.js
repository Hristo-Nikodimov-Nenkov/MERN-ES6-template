import mongoose from "mongoose";
import {roles, username} from "../constants/user.js";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      minlength: username.minlength,
      maxlength: username.maxlength,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   tokens: {
      google: {
         accessToken: String,
         expiresIn: Number,
         tokenType: String,
         refreshToken: String
      },
      facebook: {},
      github: {}
   },
   roles: {
      type: Array,
      validate: {
         validator: function (value) {
            return value.every((v) => roles.includes(v));
         },
         message: (props) =>
            `${props.value} contains invalid role. ${roles.join(
               ", "
            )} are acceptable.`,
      },
      default: [roles[0]],
   },
   passwordSalt: {
      type: String,
      required: true,
   },
   passwordHash: {
      type: String,
      required: true,
   },
});

export default userSchema;
