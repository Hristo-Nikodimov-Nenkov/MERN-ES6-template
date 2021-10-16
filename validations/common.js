import {body, validationResult} from "express-validator";
import {hasLengthMessage, isRequiredMessage} from "./messages.js";

export function validateModel(req, res, next) {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
        res.status(400).send(validations.array().map(err => err.msg));
        return;
    }

    next();
}

export function isRequired(fields) {
    return body(fields)
        .exists()
        .withMessage(isRequiredMessage(fields))
}

export function isRequiredBail(fields) {
    return isRequired(fields).bail();
}

export function hasLength(fields, minLength, maxLength) {
    return body(fields)
        .isLength({
            min: minLength,
            max: maxLength
        })
        .withMessage(hasLengthMessage(fields, minLength, maxLength))
}

export function hasLengthBail(fields, minLength, maxLength) {
    return hasLength(fields, minLength, maxLength).bail();
}