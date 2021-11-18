import {body} from "express-validator";
import {isRequiredMessage} from "../messages.js";
import fields from "./fieldNames.js";

export default [
    body(fields.identifierFieldName)
        .exists()
        .withMessage(isRequiredMessage(fields.identifierFieldName)),
    body(fields.passwordFieldName)
        .exists()
        .withMessage(isRequiredMessage(fields.passwordFieldName))
]