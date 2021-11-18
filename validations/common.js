import {body} from "express-validator";
import {isRequiredMessage} from "./messages.js";

export function bodyFieldsExists(fields) {
    return body(fields)
        .exists()
        .withMessage(isRequiredMessage(fields))
}

export function bodyFieldsExistsBail(fields) {
    return bodyFieldsExists(fields)
        .withMessage(isRequiredMessage(fields))
        .bail();
}

export default {
    bodyFieldsExists,
    bodyFieldsExistsBail
}