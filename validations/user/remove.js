import {body} from "express-validator";
import {isRequiredMessage} from "../messages.js";
import fields from "./fieldNames.js";

export default [
    body(fields.validationHashFieldName)
        .exists()
        .withMessage(isRequiredMessage(fields.validationHashFieldName)),
    body(fields.passwordFieldName)
        .exists()
        .withMessage(isRequiredMessage(fields.passwordFieldName))
]