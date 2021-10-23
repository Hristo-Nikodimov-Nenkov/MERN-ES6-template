import {username} from "./fields/username.js";
import {email} from "./fields/email.js";
import {confirmPassword, password} from "./fields/password.js";

export default [
    username("username"),
    email("email"),
    password("password"),
    confirmPassword("confirmPassword")
]