import email from "./fields/email.js";
import fieldNames from "./fieldNames.js";
import {bodyFieldsExists} from "../common.js";

export default [
    email(fieldNames.emailFieldName),
    bodyFieldsExists(fieldNames.passwordFieldName)
]