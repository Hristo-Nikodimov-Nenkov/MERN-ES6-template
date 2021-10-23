import {body, validationResult} from "express-validator";
import {isRequiredMessage} from "./messages.js";

export function validateModel(req, res, next) {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
        res.status(400).send(validations.array().map(err => err.msg));
        return;
    }

    next();
}

export function bodyFieldsExists(fields){
    return body(fields)
        .exists()
        .withMessage(isRequiredMessage(fields))
}

export function bodyFieldsExistsBail(fields){
    return bodyFieldsExists(fields)
        .bail();
}

export default {
    validateModel
}