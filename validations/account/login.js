import {body} from "express-validator";
import {isRequiredMessage} from "../messages.js";
import fields from "./fields/fieldNames.js";

export default [
    body(fields.identifier)
        .exists()
        .withMessage(isRequiredMessage(fields.identifier)),
    body(fields.password)
        .exists()
        .withMessage(isRequiredMessage(fields.password))
]