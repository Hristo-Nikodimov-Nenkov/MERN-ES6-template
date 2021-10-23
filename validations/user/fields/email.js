import {bodyFieldsExistsBail} from "../../common.js";

const defaultFields = "email";

export function email(fields = defaultFields) {
    return bodyFieldsExistsBail(fields)
        .isEmail()
        .withMessage("Valid E-Mail address is required!")
        .bail()
}