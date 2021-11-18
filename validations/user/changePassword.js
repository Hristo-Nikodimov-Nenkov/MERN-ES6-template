import fieldNames from "./fieldNames.js";
import {bodyFieldsExists} from "../common.js";
import {password} from "./fields/password.js";
import {confirmPassword} from "./fields/confirmPassword.js";

export default [
    bodyFieldsExists(fieldNames.currentPasswordFieldName),
    password(fieldNames.passwordFieldName),
    confirmPassword(fieldNames.confirmPasswordFieldName)
]