import {containsMessage, fieldsString, hasLengthMessage} from "../../messages.js";
import {password as consts} from "../../../models/constants/user.js"
import {bodyFieldsExists, bodyFieldsExistsBail} from "../../common.js";

const defaultFields = "password";
const defaultConfirmField = "confirmPassword"

export function password(fields = defaultFields) {
    return bodyFieldsExistsBail(fields)
        .isLength({
            min: consts.minLength,
            max: consts.maxLength
        })
        .withMessage(hasLengthMessage(fields, consts.minLength, consts.maxLength))
        .bail()
        .if(() => consts.requiresLowerCaseSymbol)
        .custom(val => val.toUpperCase() !== val)
        .withMessage(containsMessage(fields, "a small letter"))
        .if(() => consts.requiresUpperCaseSymbol)
        .custom(val => val.toLowerCase() !== val)
        .withMessage(containsMessage(fields, "a capital letter"))
        .if(() => consts.requiresDigit)
        .custom(val => /[0-9]/.test(val))
        .withMessage(containsMessage(fields, "a digit"))
        .if(() => consts.requiresNonAlphaNumericSymbol)
        .not()
        .isAlphanumeric()
        .withMessage(containsMessage(fields, "a non-alphanumeric symbol"))
}

export function confirmPassword(field = defaultConfirmField) {
    return bodyFieldsExists(field)
        .custom((val, {req}) => val === req.body[defaultFields])
        .withMessage(`${fieldsString(field)} does NOT match Password!`)
}