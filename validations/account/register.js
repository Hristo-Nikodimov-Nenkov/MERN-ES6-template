import fields from "./fields/fieldNames.js";
import username from "./fields/username.js";
import email from "./fields/email.js";
import password from "./fields/password.js";
import confirmPassword from "./fields/confirmPassword.js";

export default [
   username(fields.username),
   email(fields.email),
   password(fields.password),
   confirmPassword(fields.confirmPassword, fields.password)
]