import {body} from "express-validator";
import {getFieldErrorMessages} from "../../errorMessages.js";
import fieldNames from "../fieldNames.js";

const errorMessages = getFieldErrorMessages("user", fieldNames.confirmPasswordFieldName);

export const confirmPassword = (field, compareField) =>
    body(field)
        .exists({checkFalsy: true})
        .withMessage(errorMessages.isRequired)
        .bail()
        .custom((val, {req}) => val === req.body[compareField])
        .withMessage(errorMessages.isDifferent)
