import {username as consts} from "../../../models/constants/user.js";
import {hasLengthMessage} from "../../messages.js";
import {bodyFieldsExistsBail} from "../../common.js";

const defaultFields = "username";

export function username(fields = defaultFields) {
    return bodyFieldsExistsBail(fields)
        .isLength({
            min: consts.minLength,
            max: consts.maxLength
        }).withMessage(hasLengthMessage(fields, consts.minLength, consts.maxLength))
        .custom(val => consts.allowedRegex.test(val))
        .withMessage("Only alphanumeric symbols, dot, dash and _ are allowed.")
}

export default {
    username
}