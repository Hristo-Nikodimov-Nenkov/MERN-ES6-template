import {username} from "./fields/username.js";
import fieldNames from "./fieldNames.js";
import {bodyFieldsExists} from "../common.js";

export default [
    username(fieldNames.usernameFieldName),
    bodyFieldsExists(fieldNames.passwordFieldName)
]