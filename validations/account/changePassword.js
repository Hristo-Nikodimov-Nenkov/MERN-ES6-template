import fieldNames from "./fields/fieldNames.js";
import {bodyFieldsExists} from "../common.js";
import password from "./fields/password.js";
import confirmPassword from "./fields/confirmPassword.js";

export default [
    bodyFieldsExists(fieldNames.currentPassword),
    password(fieldNames.password),
    confirmPassword(fieldNames.confirmPassword)
]