import email from "./fields/email.js";
import fieldNames from "./fields/fieldNames.js";
import {bodyFieldsExists} from "../common.js";

export default [
    email(fieldNames.email),
    bodyFieldsExists(fieldNames.password)
]