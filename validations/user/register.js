import fields from "./fieldNames.js";
import {username} from "./fields/username.js";
import {email} from "./fields/email.js";
import {password} from "./fields/password.js";
import {confirmPassword} from "./fields/confirmPassword.js";

export default [
    username(fields.usernameFieldName),
    email(fields.emailFieldName),
    password(fields.passwordFieldName),
    confirmPassword(fields.confirmPasswordFieldName, fields.passwordFieldName)
]