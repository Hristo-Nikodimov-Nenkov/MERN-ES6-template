import {body} from "express-validator";
import {isRequiredMessage} from "../messages.js";
import fields from "./fields/fieldNames.js";

export default [
    body(fields.validationHash)
        .exists()
        .withMessage(isRequiredMessage(fields.validationHash)),
    body(fields.password)
        .exists()
        .withMessage(isRequiredMessage(fields.password))
]