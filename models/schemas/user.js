import {Schema} from "mongoose";
import {username} from "../constants/user.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: username.minlength,
        maxlength: username.maxlength
    },
    email: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
})

export default userSchema;