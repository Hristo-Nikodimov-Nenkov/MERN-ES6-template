import {body} from "express-validator";
import {password as consts} from "../../../models/constants/user.js";
import {getFieldErrorMessages} from "../../errorMessages.js";
import fieldNames from "../fieldNames.js";

const errorMessages = getFieldErrorMessages("user", fieldNames.passwordFieldName);

export const password = (field) =>
    body(field)
        .exists({checkFalsy: true})
        .withMessage(errorMessages.isRequired)
        .bail()
        .isLength({
            min: consts.minLength,
            max: consts.maxLength
        })
        .withMessage(errorMessages.invalidLength)
        .custom(value => value.toLowerCase() !== value)
        .withMessage(errorMessages.mustContainCapitalLetter)
        .custom(value => value.toUpperCase() !== value)
        .withMessage(errorMessages.mustContainSmallLetter)
        .custom(value => /[0-9]+/g.test(value))
        .withMessage(errorMessages.mustContainDigit)
        .custom(value => /[^a-zA-Z\d\s:]+/g.test(value))
        .withMessage(errorMessages.mustContainNonAlphanumeric)

export default password;